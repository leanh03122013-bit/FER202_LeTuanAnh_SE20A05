import guestDao from '../dao/guestDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return guestDao.findAll(); }
export async function getById(id) { return guestDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await guestDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'Guests', record_id: created?.guest_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await guestDao.findById(id);
  const updated = await guestDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'Guests', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await guestDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'Guests', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
