import GenericDao from './genericDao.js';

class AuditLogDao extends GenericDao {
  constructor() {
    super('AuditLogs', 'log_id', ["user_id", "action", "table_name", "record_id", "old_value", "new_value"]);
  }
}

export default new AuditLogDao();
