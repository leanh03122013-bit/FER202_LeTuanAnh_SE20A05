import GenericDao from './genericDao.js';

class MaintenanceDao extends GenericDao {
  constructor() {
    super('MaintenanceRequests', 'maintenance_id', ["room_id", "reported_by", "title", "description", "priority", "status", "completed_at"]);
  }
}

export default new MaintenanceDao();
