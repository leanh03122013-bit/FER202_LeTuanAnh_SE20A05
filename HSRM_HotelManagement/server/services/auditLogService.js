import auditLogDao from '../dao/auditLogDao.js';

export async function writeLog(data) {
  return auditLogDao.create(data);
}

export async function getAll() { return auditLogDao.findAll(); }
export async function getById(id) { return auditLogDao.findById(id); }
export async function create(data, currentUser = null) {
  const created = await auditLogDao.create(data);
  await writeLog({ user_id: currentUser?.user_id, action: 'CREATE', table_name: 'AuditLogs', record_id: created?.log_id, new_value: created });
  return created;
}
export async function update(id, data, currentUser = null) {
  const oldData = await auditLogDao.findById(id);
  const updated = await auditLogDao.update(id, data);
  await writeLog({ user_id: currentUser?.user_id, action: 'UPDATE', table_name: 'AuditLogs', record_id: id, old_value: oldData, new_value: updated });
  return updated;
}
export async function remove(id, currentUser = null) {
  const deleted = await auditLogDao.delete(id);
  await writeLog({ user_id: currentUser?.user_id, action: 'DELETE', table_name: 'AuditLogs', record_id: id, old_value: deleted });
  return deleted;
}
export default { getAll, getById, create, update, remove, writeLog };
