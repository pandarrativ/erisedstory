import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export enum ROLE {
  ADMIN = 'admin',
  STUDENT = 'student',
  PARENT = 'parent',
  EDUCATOR = 'educator',
}

export interface IUser extends Document {
  id: string;
  email: string;
  hashedPassword?: string;
  googleId?: string;
  username: string;
  role: ROLE;
  createdAt: Date;
  phoneNumber?: string;
}

const UserSchema = new Schema<IUser>({
  id: { 
    type: String, 
    default: 'user_' + uuid(),
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    minlength: 4,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    sparse:true,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ROLE,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

UserSchema.pre<IUser>('save', function (next) {
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0];
  }
  next();
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
