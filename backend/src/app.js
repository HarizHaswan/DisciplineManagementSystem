import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';

// Load routes
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import offenceTypeRoutes from './routes/offenceTypeRoutes.js';
import offenceRecordRoutes from './routes/offenceRecordRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import warningLetterRoutes from './routes/warningLetterRoutes.js';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for authorization headers
app.use(cors({
  origin: '*', // For development, allow all. In production, restrict to frontend domain.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming requests JSON body
app.use(express.json());

// Log requests middleware (minimal custom logger)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Quick db check
    await pool.query('SELECT 1');
    return res.status(200).json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    return res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: error.message });
  }
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/offence-types', offenceTypeRoutes);
app.use('/api/offences', offenceRecordRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/warning-letters', warningLetterRoutes);

// Fallback 404 Route
app.use((req, res) => {
  res.status(404).json({ message: `Resource not found: ${req.method} ${req.url}` });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  
  // Custom response structure
  return res.status(err.status || 500).json({
    message: err.message || 'An unexpected server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Run server and verify database connection
const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await pool.query('SELECT 1');
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection issue:');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
