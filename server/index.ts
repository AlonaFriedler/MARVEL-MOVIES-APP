import dotenv from 'dotenv';
// Load the .env file and parse the environment variables into process.env
dotenv.config();
import express from 'express';
import cors from 'cors';
import actorsRoutes from './src/routes/actorsRoutes';
import charactersRoutes from './src/routes/charactersRoutes';
import dataAcquisitionRoutes from './src/routes/dataAcquisitionRoutes';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Allow CORS for all routes
app.use(express.json()); // Middleware to parse JSON

// API Routes
app.use('/api/actors', actorsRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/dataAcquisition', dataAcquisitionRoutes);

// Error handling middleware 
//TODO utilize this middleware 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
