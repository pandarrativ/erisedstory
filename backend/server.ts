import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import DBConnector from './db/DBConnector';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swaggerSpec';
import router from './routes/router';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.get('/', (req, res) => {res.json({ message: 'hello' });});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', router);

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
