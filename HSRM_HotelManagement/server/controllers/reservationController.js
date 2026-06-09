import * as service from '../services/reservationService.js';
import { success, error } from '../utils/responseHandler.js';

export async function getAll(req, res) { try { success(res, await service.getAll()); } catch (err) { error(res, err.message); } }
export async function getById(req, res) { try { const item = await service.getById(req.params.id); item ? success(res, item) : error(res, 'Not found', 404); } catch (err) { error(res, err.message); } }
export async function availableRooms(req, res) { try { success(res, await service.getAvailableRooms(req.query)); } catch (err) { error(res, err.message, 400); } }
export async function create(req, res) { try { success(res, await service.create(req.body, req.user), 'Created', 201); } catch (err) { error(res, err.message, 400); } }
export async function update(req, res) { try { success(res, await service.update(req.params.id, req.body, req.user), 'Updated'); } catch (err) { error(res, err.message, 400); } }
export async function confirm(req, res) { try { success(res, await service.confirm(req.params.id, req.user), 'Confirmed'); } catch (err) { error(res, err.message, 400); } }
export async function cancel(req, res) { try { success(res, await service.cancel(req.params.id, req.user), 'Cancelled'); } catch (err) { error(res, err.message, 400); } }
export async function remove(req, res) { try { success(res, await service.remove(req.params.id, req.user), 'Deleted'); } catch (err) { error(res, err.message, 400); } }
