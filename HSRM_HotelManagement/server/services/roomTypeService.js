import roomTypeDao from '../dao/roomTypeDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return roomTypeDao.findAll(); }
export async function getById(id) { return roomTypeDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await roomTypeDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'RoomTypes', record_id: created?.room_type_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await roomTypeDao.findById(id);
  const updated = await roomTypeDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'RoomTypes', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await roomTypeDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'RoomTypes', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
