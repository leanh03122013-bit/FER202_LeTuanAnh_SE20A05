import GenericDao from './genericDao.js';

class HotelServiceDao extends GenericDao {
  constructor() {
    super('Services', 'service_id', ["service_name", "category", "price", "description", "status"]);
  }
}

export default new HotelServiceDao();
