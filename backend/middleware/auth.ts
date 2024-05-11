import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../errors';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export async function authenticate(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: ERRORS.UNAUTHENTICATED });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ message: ERRORS.INVALID_JWT_TOKEN });
      return;
    }
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
}

export function authorize(role: string) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user?.role || '';
    if (role === userRole) {
      res.status(403).json({ error: ERRORS.ACCESS_FORBIDDEN });
      return;
    }
    next();
  };
}
