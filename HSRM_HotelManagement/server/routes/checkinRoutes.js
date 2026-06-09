import express from 'express';
import * as controller from '../controllers/checkinController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/', authMiddleware, controller.getAll);
router.post('/', authMiddleware, controller.create);
export default router;
