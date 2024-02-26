import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  email: string;
  hashedPassword: string;
  username: string;
  role: string;
  createdAt: Date;
}

const UserSchema = new Schema<User> ({
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
    enum: ["parent", "instructor", "admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

UserSchema.pre<User>("save", function (next) {
  if (!this.username && this.email) {
    this.username = this.email.split("@")[0];
  }
  next();
});

export const UserModel = mongoose.model<User>("User", UserSchema);
