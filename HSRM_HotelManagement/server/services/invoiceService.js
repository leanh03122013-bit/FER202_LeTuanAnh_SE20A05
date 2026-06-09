import invoiceDao from '../dao/invoiceDao.js';
import reservationDao from '../dao/reservationDao.js';
import roomDao from '../dao/roomDao.js';
import { getPool, sql } from '../config/db.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return invoiceDao.findAll(); }
export async function getById(id) { return invoiceDao.findById(id); }

export async function calculate(reservationId) {
  const pool = await getPool();
  const result = await pool.request().input('ReservationId', sql.Int, reservationId).execute('sp_CalculateInvoice');
  return result.recordset[0];
}

export async function create(data, currentUser = null) {
  const amounts = await calculate(data.reservation_id);
  const discount = Number(data.discount_amount || 0);
  const invoice = await invoiceDao.create({
    reservation_id: data.reservation_id,
    room_fee: amounts.room_fee,
    service_fee: amounts.service_fee,
    discount_amount: discount,
    total_amount: Number(amounts.total_amount) - discount,
    payment_method: data.payment_method || null,
    payment_status: data.payment_status || 'Unpaid',
    created_by: currentUser?.user_id || data.created_by,
  });
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE_INVOICE', table_name: 'Invoices', record_id: invoice.invoice_id, new_value: invoice });
  return invoice;
}

export async function pay(id, data, currentUser = null) {
  const invoice = await invoiceDao.update(id, { payment_status: 'Paid', payment_method: data.payment_method || 'Cash', paid_at: new Date() });
  const reservation = await reservationDao.findById(invoice.reservation_id);
  await reservationDao.update(invoice.reservation_id, { status: 'CheckedOut' });
  if (reservation) await roomDao.update(reservation.room_id, { status: 'Dirty' });
  await writeLog({ user_id: currentUser?.user_id, action: 'CHECK_OUT_AND_PAY', table_name: 'Invoices', record_id: id, new_value: invoice });
  return invoice;
}

export async function update(id, data, currentUser = null) {
  const oldData = await invoiceDao.findById(id);
  const updated = await invoiceDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE_INVOICE', table_name: 'Invoices', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}

export async function remove(id, currentUser = null) {
  const deleted = await invoiceDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE_INVOICE', table_name: 'Invoices', record_id: id, old_value: deleted });
  return deleted;
}
