import GenericDao from './genericDao.js';

class ReservationDao extends GenericDao {
  constructor() {
    super('Reservations', 'reservation_id', ["guest_id", "room_id", "check_in_date", "check_out_date", "adults", "children", "status", "note", "created_by"]);
  }
}

export default new ReservationDao();
