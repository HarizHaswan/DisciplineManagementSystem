import { Router } from 'express';
import {
  getAllOffenceTypes,
  getOffenceTypeById,
  createOffenceType,
  updateOffenceType,
  deleteOffenceType,
} from '../controllers/offenceTypeController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Protected routes (teachers can list categories)
router.get('/', authenticate, getAllOffenceTypes);
router.get('/:id', authenticate, getOffenceTypeById);

// Admin-only modification routes
router.post('/', authenticate, restrictTo('ADMIN'), createOffenceType);
router.put('/:id', authenticate, restrictTo('ADMIN'), updateOffenceType);
router.delete('/:id', authenticate, restrictTo('ADMIN'), deleteOffenceType);

export default router;
