import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  getStudentByIC,
  createStudent,
  updateStudent,
  deleteStudent,
  promoteStudents,
  getAllKursus,
  importStudents,
} from '../controllers/studentController.js';
import { authenticate, restrictTo } from '../middleware/auth.js';

const router = Router();

// Protected routes (available to authenticated admins and teachers)
router.get('/', authenticate, getAllStudents);
router.get('/kursus', authenticate, getAllKursus);
router.get('/ic/:icNumber', authenticate, getStudentByIC);
router.get('/:studentNumber', authenticate, getStudentById);

// Admin-only write routes
router.post('/', authenticate, restrictTo('ADMIN'), createStudent);
router.post('/promote', authenticate, restrictTo('ADMIN'), promoteStudents);
router.post('/import', authenticate, restrictTo('ADMIN'), importStudents);
router.put('/:studentNumber', authenticate, restrictTo('ADMIN'), updateStudent);
router.delete('/:studentNumber', authenticate, restrictTo('ADMIN'), deleteStudent);

export default router;
