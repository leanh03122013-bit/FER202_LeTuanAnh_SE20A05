import GenericDao from './genericDao.js';

class RoleDao extends GenericDao {
  constructor() {
    super('Roles', 'role_id', ["role_name", "description"]);
  }
}

export default new RoleDao();
