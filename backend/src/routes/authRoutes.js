import { Router } from 'express';
import { login, register, getMe } from '../controllers/authController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/login', login);

// Protected routes (requires login)
router.get('/me', authenticate, getMe);

// Admin-only routes
router.post('/register', authenticate, restrictTo('ADMIN'), register);

export default router;
