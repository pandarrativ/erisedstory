import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_LIFETIME = process.env.JWT_LIFETIME;
const COOKIE_ALLOWED_ORIGIN = process.env.COOKIE_ALLOWED_ORIGIN;

export function createJWTCookie(res: Response, user:IUser, ) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY!, {
        expiresIn: JWT_LIFETIME,
    });

    res.cookie('token', token, { 
        httpOnly: true, 
        sameSite: 'lax', //https://web.dev/articles/samesite-cookies-explained
        domain: COOKIE_ALLOWED_ORIGIN, 
        // secure: true 
    });
}