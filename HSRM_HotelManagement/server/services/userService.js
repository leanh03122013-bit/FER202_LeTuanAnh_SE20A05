import userDao from '../dao/userDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return userDao.findAll(); }
export async function getById(id) { return userDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await userDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'Users', record_id: created?.user_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await userDao.findById(id);
  const updated = await userDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'Users', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await userDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'Users', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
