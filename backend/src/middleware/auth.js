import jwt from 'jsonwebtoken';
import { queryOne } from '../config/db.js';

// Verify JWT token in request headers
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // Retrieve user from database to ensure they still exist and are active
    const user = await queryOne(
      'SELECT id, username, name, role FROM `User` WHERE id = ?',
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({ message: 'User not found or invalid session.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid or corrupted authentication token.' });
  }
};

// Guard route to restrict access to specific roles (e.g., ADMIN only)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Permission denied. You do not have the required access for this action.',
      });
    }
    next();
  };
};
