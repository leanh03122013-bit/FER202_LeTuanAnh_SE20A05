import express from 'express';
import * as controller from '../controllers/reportController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/dashboard', authMiddleware, controller.dashboard);
router.get('/monthly-revenue', authMiddleware, controller.monthlyRevenue);
export default router;
