import { Router } from 'express';
import {
  getAllWarningLetters,
  getEligibleStudents,
  generateWarningLetter,
  issueWarningLetter,
  deleteWarningLetter,
  getWarningLetterPDF,
} from '../controllers/warningLetterController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Protected routes (available to both ADMIN and TEACHER)
// Note: Teachers are restricted to view only ISSUED status inside the controller itself
router.get('/', authenticate, getAllWarningLetters);
router.get('/:id(\\d+)/pdf', authenticate, getWarningLetterPDF);

// Admin-only routes for generating, approving, and deleting warning letters
router.get('/eligible', authenticate, restrictTo('ADMIN'), getEligibleStudents);
router.post('/generate', authenticate, restrictTo('ADMIN'), generateWarningLetter);
router.post('/:id(\\d+)/issue', authenticate, restrictTo('ADMIN'), issueWarningLetter);
router.delete('/:id(\\d+)', authenticate, restrictTo('ADMIN'), deleteWarningLetter);

export default router;
