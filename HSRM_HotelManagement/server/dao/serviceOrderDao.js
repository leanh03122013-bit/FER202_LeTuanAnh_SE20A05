import GenericDao from './genericDao.js';

class ServiceOrderDao extends GenericDao {
  constructor() {
    super('ServiceOrders', 'service_order_id', ["reservation_id", "service_id", "quantity", "unit_price", "status", "note"]);
  }
}

export default new ServiceOrderDao();
