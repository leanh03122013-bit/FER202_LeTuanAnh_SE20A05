import * as service from '../services/checkinService.js';
import { success, error } from '../utils/responseHandler.js';
export async function getAll(req,res){try{success(res, await service.getAll())}catch(err){error(res,err.message)}}
export async function create(req,res){try{success(res, await service.create(req.body, req.user), 'Checked in', 201)}catch(err){error(res,err.message,400)}}
