import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN } from '../config/jwt.js';

export function generateToken(user) {
  return jwt.sign(
    { user_id: user.user_id, email: user.email, role_name: user.role_name },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
