import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import DBConnector from './utils/DBConnector';
import router from './routes/router';
import { corsOptions } from './utils/corsOptions';


const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// extend SessionData. it should be at the top-level of typescript files
declare module 'express-session' {
    interface SessionData {
    redirectUri: string
  }
}


const app = express();

app.use((req, res, next) => {
  const startTime = process.hrtime();

  // Function to log after the response is sent
  res.on('finish', () => {
    const duration = process.hrtime(startTime);
    const durationInMs = (duration[0] * 1e9 + duration[1]) / 1e6;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${durationInMs.toFixed(3)} ms - AJAX: ${req.xhr}`);
  });

  next();
});


app.use(session({
  secret: SECRET_KEY || "pandarativ-not-secrect-key",  
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: 'auto' }  // secure: true in production if using HTTPS
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);




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
