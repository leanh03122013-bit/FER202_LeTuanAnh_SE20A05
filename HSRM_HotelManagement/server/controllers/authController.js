import * as authService from '../services/authService.js';
import { success, error } from '../utils/responseHandler.js';

export async function register(req, res) {
  try { success(res, await authService.register(req.body), 'Registered', 201); }
  catch (err) { error(res, err.message, 400); }
}

export async function login(req, res) {
  try { success(res, await authService.login(req.body.email, req.body.password), 'Logged in'); }
  catch (err) { error(res, err.message, 401); }
}

export async function profile(req, res) {
  try { success(res, await authService.getProfile(req.user.user_id)); }
  catch (err) { error(res, err.message); }
}
