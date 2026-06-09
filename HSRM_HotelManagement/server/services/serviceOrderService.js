import serviceOrderDao from '../dao/serviceOrderDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return serviceOrderDao.findAll(); }
export async function getById(id) { return serviceOrderDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await serviceOrderDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'ServiceOrders', record_id: created?.service_order_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await serviceOrderDao.findById(id);
  const updated = await serviceOrderDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'ServiceOrders', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await serviceOrderDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'ServiceOrders', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
