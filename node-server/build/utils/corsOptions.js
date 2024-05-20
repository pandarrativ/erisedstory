"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = [
    // 'http://localhost:3000',
    'http://pandarrativ.com',
    'http://pdtalk.pandarrativ.com',
    'http://card.pandarrativ.com',
];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
};
