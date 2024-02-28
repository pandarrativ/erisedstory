import express from "express";
import authController from "../controllers/authController";
import { validateLoginInputs, validateRegisterInputs } from "../middleware/validation";

const authRouter = express.Router();

authRouter.post("/register", validateRegisterInputs(), authController.registerUser);
authRouter.post("/login", validateLoginInputs(), authController.loginUser);
authRouter.post("/logout", authController.logoutUser);

export default authRouter;
