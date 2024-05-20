import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types';
import bcrypt from 'bcrypt';


export const ROLES = ['student', 'parent', 'educator', 'admin'];


const UserSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.UUID,
    default: uuidv4
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
    index: true,
    unique: true,
    sparse: true, // This makes the index only consider documents where googleId exists
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ROLES,
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


// for oauth create user 
export async function createUser(email: string, password: string, role: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      hashedPassword,
      role,
    });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
}


export const UserModel = mongoose.model<IUser>('User', UserSchema);