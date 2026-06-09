import GenericDao from './genericDao.js';

class GuestDao extends GenericDao {
  constructor() {
    super('Guests', 'guest_id', ["full_name", "phone", "email", "id_number", "gender", "date_of_birth", "address"]);
  }
}

export default new GuestDao();
