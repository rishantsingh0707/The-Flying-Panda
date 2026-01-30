import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import alertRoutes from './routes/alertRoutes.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', alertRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
