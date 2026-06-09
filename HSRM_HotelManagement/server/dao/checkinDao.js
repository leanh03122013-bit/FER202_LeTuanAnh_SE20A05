import GenericDao from './genericDao.js';

class CheckinDao extends GenericDao {
  constructor() {
    super('CheckIns', 'checkin_id', ["reservation_id", "actual_guest_count", "receptionist_id", "note"]);
  }
}

export default new CheckinDao();
