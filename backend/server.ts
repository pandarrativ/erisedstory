import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swaggerSpec';
import authRoutes from './routes/authRoutes';
import DBConnector from './db/DBConnector';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

app.use('/api/v1/auth', authRoutes);

async function start() {
  try {
    const dbConnector = new DBConnector(MONGODB_URI);
    await dbConnector.connect();
    app.listen(PORT, () => {
      console.log(`⚡️Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

start();
