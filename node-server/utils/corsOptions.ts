import { CorsOptions } from '../types';

const allowedOrigins: string[] = [
    // 'http://localhost:3000',
    'http://pandarrativ.com',
    'http://pdtalk.pandarrativ.com',
    'http://card.pandarrativ.com',
  ];
  
 export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true
  };