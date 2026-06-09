import GenericDao from './genericDao.js';

class UserDao extends GenericDao {
  constructor() {
    super('Users', 'user_id', ["full_name", "email", "password_hash", "phone", "role_id", "status"]);
  }
}

export default new UserDao();
