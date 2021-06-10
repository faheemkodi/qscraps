import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import pkg from 'cloudinary';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';
import connectDB from './config/db.js';

import listingRoutes from './routes/listingRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import makeRoutes from './routes/makeRoutes.js';
import modelRoutes from './routes/modelRoutes.js';
import yearRoutes from './routes/yearRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

const cloudinary = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/listings', listingRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/makes', makeRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/years', yearRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
