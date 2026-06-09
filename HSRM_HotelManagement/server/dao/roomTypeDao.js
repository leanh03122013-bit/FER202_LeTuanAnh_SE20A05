import GenericDao from './genericDao.js';

class RoomTypeDao extends GenericDao {
  constructor() {
    super('RoomTypes', 'room_type_id', ["type_name", "description", "base_price", "capacity", "status"]);
  }
}

export default new RoomTypeDao();
