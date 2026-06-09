import reservationDao from '../dao/reservationDao.js';
import roomDao from '../dao/roomDao.js';
import { getPool, sql } from '../config/db.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return reservationDao.findAll(); }
export async function getById(id) { return reservationDao.findById(id); }

export async function getAvailableRooms({ check_in_date, check_out_date, room_type_id = null }) {
  const pool = await getPool();
  const request = pool.request()
    .input('CheckInDate', sql.Date, check_in_date)
    .input('CheckOutDate', sql.Date, check_out_date)
    .input('RoomTypeId', sql.Int, room_type_id);
  const result = await request.execute('sp_GetAvailableRooms');
  return result.recordset;
}

export async function create(data, currentUser = null) {
  const availableRooms = await getAvailableRooms({
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    room_type_id: null,
  });
  const isAvailable = availableRooms.some(room => Number(room.room_id) === Number(data.room_id));
  if (!isAvailable) throw new Error('Room is not available for selected dates');

  const created = await reservationDao.create({ ...data, status: data.status || 'Pending', created_by: currentUser?.user_id || data.created_by });
  if (created.status === 'Confirmed') await roomDao.update(created.room_id, { status: 'Booked' });
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'Reservations', record_id: created.reservation_id, new_value: created });
  return created;
}

export async function update(id, data, currentUser = null) {
  const oldData = await reservationDao.findById(id);
  const updated = await reservationDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'Reservations', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}

export async function confirm(id, currentUser = null) {
  const updated = await reservationDao.update(id, { status: 'Confirmed' });
  if (updated) await roomDao.update(updated.room_id, { status: 'Booked' });
  await writeLog({ user_id: currentUser?.user_id, action: 'CONFIRM_RESERVATION', table_name: 'Reservations', record_id: id, new_value: updated });
  return updated;
}

export async function cancel(id, currentUser = null) {
  const updated = await reservationDao.update(id, { status: 'Cancelled' });
  if (updated) await roomDao.update(updated.room_id, { status: 'Available' });
  await writeLog({ user_id: currentUser?.user_id, action: 'CANCEL_RESERVATION', table_name: 'Reservations', record_id: id, new_value: updated });
  return updated;
}

export async function remove(id, currentUser = null) {
  const deleted = await reservationDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'Reservations', record_id: id, old_value: deleted });
  return deleted;
}
