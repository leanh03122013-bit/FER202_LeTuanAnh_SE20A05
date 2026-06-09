import * as service from '../services/reportService.js';
import { success, error } from '../utils/responseHandler.js';
export async function dashboard(req,res){try{success(res, await service.dashboard())}catch(err){error(res,err.message)}}
export async function monthlyRevenue(req,res){try{success(res, await service.monthlyRevenue())}catch(err){error(res,err.message)}}
