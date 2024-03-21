import mongoose, { Schema } from 'mongoose';

export const ROLES = ['parent', 'educator', 'admin'];

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  hashedPassword: string;
  username: string;
  role: string;
  createdAt: Date;
  phoneNumber?: string;
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 4,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ROLES,
    required: true,
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

UserSchema.pre<User>('save', function (next) {
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0];
  }
  next();
});

export const UserModel = mongoose.model<User>('User', UserSchema);
