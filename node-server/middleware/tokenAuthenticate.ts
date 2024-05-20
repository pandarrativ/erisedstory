import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'KEY NOT FOUND'; // Ensure you have a secret key

export const authenticateUserDataToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;  // Assuming the token is stored in an HTTP-only cookie
    
    if (token == null) {
        res.sendStatus(401); // if no token, unauthorized
        return;
    }

    jwt.verify(token, JWT_SECRET_KEY, (err: any, user: any) => {
        if (err) {
            res.sendStatus(403); // if token is not valid, forbidden
            return;
        }
        req.user = user;
        next();
    });
};
