import express from "express";
import authController from "../controllers/authController";
import { validateLoginInputs, validateRegisterInputs } from "../middleware/validation";

const authRouter = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role of the user. Can be "admin" or "user".
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: The confirmation password of the user.
 *     responses:
 *       201:
 *         description: Successfully registered a new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The email of the registered user.
 *                     username:
 *                       type: string
 *                       description: The username of the registered user.
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful registration.
 *       400:
 *         description: Bad request. One or more request parameters are invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   description: An object containing validation errors.
 *       403:
 *         description: Forbidden. Registration as admin is not allowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that registration as admin is forbidden.
 *       409:
 *         description: Conflict. The provided email is already registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the provided email is already registered.
 */
authRouter.post("/register", validateRegisterInputs(), authController.registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with the email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The email of the logged-in user.
 *                     username:
 *                       type: string
 *                       description: The username of the logged-in user.
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful login.
 *       400:
 *         description: Bad request. One or more request parameters are invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   description: An object containing validation errors.
 *       401:
 *         description: Unauthorized. The provided password is not registered or incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the provided password is not registered or incorrect.
 */
authRouter.post("/login", validateLoginInputs(), authController.loginUser);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logs out the user.
 *     description: Clears the authentication token cookie, effectively logging out the user.
 *     responses:
 *       '200':
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */

authRouter.post("/logout", authController.logoutUser);

export default authRouter;
