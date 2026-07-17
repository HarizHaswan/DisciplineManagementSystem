import { Router } from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Only authenticated Admins can pull analytics data
router.get('/dashboard', authenticate, restrictTo('ADMIN'), getDashboardStats);

export default router;
