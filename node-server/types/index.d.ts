import { IUser } from "../models/user";


export interface IUser extends Document {
    _id: Schema.Types.UUID;
    email: string;
    hashedPassword?: string;
    googleId?: string;
    username: string;
    role?: string;
    createdAt: Date;
    phoneNumber?: string;
  }

export type OauthUser = {
    googleId?: string;
  };  

export interface TokenUser{
    userId: string
} 

export interface CorsOptions {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    credentials: boolean;
}


export interface CorsOptions {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
  credentials: boolean;
}