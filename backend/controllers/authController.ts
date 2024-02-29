import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User, UserModel } from "../models/user";
import ERRORS from "../errors";

const authController = {
  async registerUser(req: Request, res: Response) {
    const { role, email, password, confirmPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors
        .array()
        .reduce((acc: { [key: string]: string }, error: any) => {
          acc[error.path] = error.msg;
          return acc;
        }, {});
      res.status(400).json({ errors: formattedErrors });
      return;
    }

    const emailAlreadyRegistered = await UserModel.findOne({ email });
    if (emailAlreadyRegistered) {
      res.status(409).json({ error: ERRORS.EMAIL_IN_USE });
      return;
    }

    try {
      const user: User = await createUser(email, password, role);
      const token = createJWT(user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const validationErrors: { [key: string]: string } = {};
        for (const field in err.errors) {
          validationErrors[field] = (err.errors[field] as any).message;
        }
        res.status(400).json({ errors: validationErrors });
        return;
      }
      console.log(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors
        .array()
        .reduce((acc: { [key: string]: string }, error: any) => {
          acc[error.path] = error.msg;
          return acc;
        }, {});
      res.status(400).json({ errors: formattedErrors });
      return;
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ error: ERRORS.EMAIL_NOT_REGISTERED });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        res.status(401).json({ error: ERRORS.INCORRECT_PASSWORD });
        return;
      }
      const token = createJWT(user);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  logoutUser(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },
};

async function createUser(email: string, password: string, role: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      hashedPassword,
      role,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

function createJWT(user: User) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

export default authController;
