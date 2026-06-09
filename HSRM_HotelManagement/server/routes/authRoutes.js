import express from 'express';
import * as controller from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', authMiddleware, controller.profile);
export default router;
