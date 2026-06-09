import hotelServiceDao from '../dao/hotelServiceDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return hotelServiceDao.findAll(); }
export async function getById(id) { return hotelServiceDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await hotelServiceDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'Services', record_id: created?.service_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await hotelServiceDao.findById(id);
  const updated = await hotelServiceDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'Services', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await hotelServiceDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'Services', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
