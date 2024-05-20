import { Response } from 'express';
import { IUser } from '../types';
export declare function createJWTCookie(res: Response, user: IUser): void;
