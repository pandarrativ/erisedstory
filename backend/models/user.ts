import mongoose, { Schema } from 'mongoose';

export const ROLES = ['student', 'parent', 'educator', 'admin'];

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  hashedPassword?: string;
  googleId?: string;
  username: string;
  role: string;
  createdAt: Date;
  phoneNumber?: string;
}

const UserSchema = new Schema<IUser>({
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
    unique: true,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ROLES,
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