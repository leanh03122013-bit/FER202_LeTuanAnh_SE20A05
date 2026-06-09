import * as service from '../services/maintenanceService.js';
import { success, error } from '../utils/responseHandler.js';

export async function getAll(req, res) {
  try { success(res, await service.getAll()); } catch (err) { error(res, err.message); }
}
export async function getById(req, res) {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return error(res, 'Not found', 404);
    success(res, item);
  } catch (err) { error(res, err.message); }
}
export async function create(req, res) {
  try { success(res, await service.create(req.body, req.user), 'Created', 201); } catch (err) { error(res, err.message, 400); }
}
export async function update(req, res) {
  try {
    const item = await service.update(req.params.id, req.body, req.user);
    if (!item) return error(res, 'Not found', 404);
    success(res, item, 'Updated');
  } catch (err) { error(res, err.message, 400); }
}
export async function remove(req, res) {
  try {
    const item = await service.remove(req.params.id, req.user);
    if (!item) return error(res, 'Not found', 404);
    success(res, item, 'Deleted');
  } catch (err) { error(res, err.message, 400); }
}
