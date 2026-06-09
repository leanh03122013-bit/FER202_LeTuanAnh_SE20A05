import GenericDao from './genericDao.js';

class InvoiceDao extends GenericDao {
  constructor() {
    super('Invoices', 'invoice_id', ["reservation_id", "room_fee", "service_fee", "discount_amount", "total_amount", "payment_method", "payment_status", "created_by", "paid_at"]);
  }
}

export default new InvoiceDao();
