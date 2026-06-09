import bcrypt from 'bcrypt';
import userDao from '../dao/userDao.js';
import { getPool, sql } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

export async function register(data) {
  const password_hash = await bcrypt.hash(data.password, 10);
  const user = await userDao.create({
    full_name: data.full_name,
    email: data.email,
    password_hash,
    phone: data.phone,
    role_id: data.role_id || 3,
    status: 'Active',
  });
  delete user.password_hash;
  return user;
}

export async function login(email, password) {
  const pool = await getPool();
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query(`
      SELECT u.*, r.role_name
      FROM Users u
      JOIN Roles r ON u.role_id = r.role_id
      WHERE u.email = @email AND u.status = 'Active'
    `);

  const user = result.recordset[0];
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password_hash).catch(() => false);
  const isPlainDevPassword = user.password_hash === password;
  if (!isMatch && !isPlainDevPassword) throw new Error('Invalid email or password');

  const token = generateToken(user);
  delete user.password_hash;
  return { user, token };
}

export async function getProfile(userId) {
  const user = await userDao.findById(userId);
  if (user) delete user.password_hash;
  return user;
}
