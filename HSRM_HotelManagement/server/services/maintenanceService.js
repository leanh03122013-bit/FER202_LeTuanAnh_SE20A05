import maintenanceDao from '../dao/maintenanceDao.js';
import { writeLog } from './auditLogService.js';

export async function getAll() { return maintenanceDao.findAll(); }
export async function getById(id) { return maintenanceDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await maintenanceDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'MaintenanceRequests', record_id: created?.maintenance_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await maintenanceDao.findById(id);
  const updated = await maintenanceDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'MaintenanceRequests', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await maintenanceDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'MaintenanceRequests', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove };
