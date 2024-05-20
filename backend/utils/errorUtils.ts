import { Response } from 'express';

export class CustomError extends Error {
  statusCode: number;
  name: string;

  constructor(statusCode: number, name: string, message?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleErrorResponse(res: Response, err: any) {
  // TODO: debug print
  console.log(err);
  
  const statusCode = err.statusCode || 500;
  const errorName = err.name || '';
  const errorMessage = err.message || err.toString() || '';

  res.status(statusCode).json({ error: errorName, message: errorMessage });
}
