import GenericDao from './genericDao.js';

class RoomDao extends GenericDao {
  constructor() {
    super('Rooms', 'room_id', ["room_number", "room_type_id", "floor_number", "status", "note"]);
  }
}

export default new RoomDao();
