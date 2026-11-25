import { Router } from 'express';
import {
  getAllOffences,
  getOffenceById,
  createOffence,
  updateOffence,
  deleteOffence,
  downloadWarningLetter,
} from '../controllers/offenceRecordController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Protected routes (teachers can see and log)
router.get('/', authenticate, getAllOffences);
router.get('/:id(\\d+)', authenticate, getOffenceById);
router.post('/', authenticate, createOffence);

// Warning letter download
router.get('/warning-letter/:studentId/:warningIndex(\\d+)', authenticate, downloadWarningLetter);

// Admin-only routes
router.put('/:id(\\d+)', authenticate, restrictTo('ADMIN'), updateOffence);
router.delete('/:id(\\d+)', authenticate, restrictTo('ADMIN'), deleteOffence);

export default router;
