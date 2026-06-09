import roomDao from '../dao/roomDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return roomDao.findAll(); }
export async function getById(id) { return roomDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await roomDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'Rooms', record_id: created?.room_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await roomDao.findById(id);
  const updated = await roomDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'Rooms', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await roomDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'Rooms', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
