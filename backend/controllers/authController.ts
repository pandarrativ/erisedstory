import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { User, UserModel } from "../models/user";

const authController = {
  async registerUser(req: Request, res: Response) {
    const { role, email, password, confirmPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc: { [key: string]: string }, error: any) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      res.status(400).json({ errors: formattedErrors });
      return;
    }

    if (role === "admin") {
      res.status(403).json({ error: "Registering as admin is not allowed" });
      return;
    }

    const emailAlreadyRegistered = await UserModel.findOne({ email });
    if (emailAlreadyRegistered) {
      res.status(403).json({ error: "Email already registered" });
      return;
    }

    const user: User = await createUser(email, password, role);
    res.status(201).json({
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
      },
      message: "User registered successfully",
    });
  },
};

///////////////////////////////////////////////////////////////////
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

export default authController;