import checkinDao from '../dao/checkinDao.js';
import reservationDao from '../dao/reservationDao.js';
import roomDao from '../dao/roomDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return checkinDao.findAll(); }
export async function create(data, currentUser = null) {
  const reservation = await reservationDao.findById(data.reservation_id);
  if (!reservation) throw new Error('Reservation not found');
  if (!['Confirmed', 'Pending'].includes(reservation.status)) throw new Error('Reservation cannot be checked in');
  const checkin = await checkinDao.create({ ...data, receptionist_id: currentUser?.user_id || data.receptionist_id });
  await reservationDao.update(data.reservation_id, { status: 'CheckedIn' });
  await roomDao.update(reservation.room_id, { status: 'InUse' });
  await writeLog({ user_id: currentUser?.user_id, action: 'CHECK_IN', table_name: 'Reservations', record_id: data.reservation_id, new_value: checkin });
  return checkin;
}
export default { getAll, create };
