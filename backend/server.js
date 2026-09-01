import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Hide tech stack to prevent information disclosure
app.disable('x-powered-by');

// 2. Set secure HTTP response headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Prevents breaking inline scripts/Vite builds during development
    crossOriginEmbedderPolicy: false
  })
);

// 3. Configure CORS securely
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
} else {
  console.warn('MONGODB_URI is not defined in environment variables.');
}

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../dist')));

// Clean catch-all handler for Single Page Application routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
