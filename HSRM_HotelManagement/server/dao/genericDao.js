import { getPool, sql } from '../config/db.js';

export default class GenericDao {
  constructor(tableName, idField, allowedFields = []) {
    this.tableName = tableName;
    this.idField = idField;
    this.allowedFields = allowedFields;
  }

  sanitize(data) {
    const result = {};
    for (const key of this.allowedFields) {
      if (data[key] !== undefined) result[key] = data[key];
    }
    return result;
  }

  async findAll() {
    const pool = await getPool();
    const result = await pool.request().query(`SELECT * FROM ${this.tableName} ORDER BY ${this.idField} DESC`);
    return result.recordset;
  }

  async findById(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM ${this.tableName} WHERE ${this.idField} = @id`);
    return result.recordset[0] || null;
  }

  async create(data) {
    const clean = this.sanitize(data);
    const keys = Object.keys(clean);
    if (!keys.length) throw new Error('No valid data to insert');

    const pool = await getPool();
    const request = pool.request();
    keys.forEach((key) => request.input(key, clean[key]));

    const columns = keys.join(', ');
    const values = keys.map((key) => `@${key}`).join(', ');
    const query = `INSERT INTO ${this.tableName} (${columns}) OUTPUT INSERTED.* VALUES (${values})`;
    const result = await request.query(query);
    return result.recordset[0];
  }

  async update(id, data) {
    const clean = this.sanitize(data);
    const keys = Object.keys(clean);
    if (!keys.length) return this.findById(id);

    const pool = await getPool();
    const request = pool.request().input('id', sql.Int, id);
    keys.forEach((key) => request.input(key, clean[key]));

    const setClause = keys.map((key) => `${key} = @${key}`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${setClause} OUTPUT INSERTED.* WHERE ${this.idField} = @id`;
    const result = await request.query(query);
    return result.recordset[0] || null;
  }

  async delete(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM ${this.tableName} OUTPUT DELETED.* WHERE ${this.idField} = @id`);
    return result.recordset[0] || null;
  }
}
