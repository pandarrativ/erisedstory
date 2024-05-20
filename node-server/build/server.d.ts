import 'dotenv/config';
declare module 'express-session' {
    interface SessionData {
        redirectUri: string;
    }
}
