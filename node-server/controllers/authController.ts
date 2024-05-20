import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/user';
import { IUser } from '../types';
import ERRORS from '../utils/errors';
import logger from '../utils/logger';
import validateRedirectUri, { getRedirectURI } from '../utils/redirects';
import { createJWTCookie } from '../middleware/createJWTCookie';
import { createUser } from '../models/user';
import bcrypt from 'bcrypt';



const authController = {
  async registerUser(req: Request, res: Response) {
    const { role, email, password } = req.body;

    // redirect destination
    const dest: string = req.query.dest as string; 
    const redirectUrl = validateRedirectUri(dest);
    if (!redirectUrl) {
      logger.error("Redirect error at location key: %O", dest);
      res.status(400).json({ message: ERRORS.INVALID_REDIRECT });
    } 

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors["errors"][0]["msg"] });  // returns the first error message
    }

    const emailAlreadyRegistered = await UserModel.findOne({ email });
    if (emailAlreadyRegistered) {
      res.status(409).json({ message: ERRORS.EMAIL_IN_USE });
      return;
    }

    try {
      const user: IUser = await createUser(email, password, role);
      // create jwt to cookie
      createJWTCookie(res, user);

      res.status(201).json({
        redirectURL: getRedirectURI(redirectUrl || "/")
      });

    } catch (err: any) {
      // handle error
      if (err.name === 'ValidationError') {
        const validationErrors: { [key: string]: string } = {};
        for (const field in err.errors) {
          validationErrors[field] = (err.errors[field] as any).message;
        }
        res.status(400).json({ messages: validationErrors });
        return;
      }
      res.status(500).json({ message: err.toString() });
    }
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // redirect destination
    const dest: string = req.query.dest as string; 
    const redirectUrl = validateRedirectUri(dest);
    if (!redirectUrl) {
      logger.error("Google OAuth redirect error at location key: %O", dest);
      res.status(400).json({ message: ERRORS.INVALID_REDIRECT });
    } 

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors["errors"][0]["msg"] });  // returns the first error message
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: ERRORS.EMAIL_NOT_REGISTERED });
        return;
      }

      if (!user.hashedPassword) {
        res.status(401).json({ message: ERRORS.GOOGLE_OAUTH_LOGIN });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        res.status(401).json({ message: ERRORS.INCORRECT_PASSWORD });
        return;
      }

      // create jwt to cookie
      createJWTCookie(res, user);

      res.status(201).json({
        redirectURL: getRedirectURI(redirectUrl || "/")
      }); 
    } catch (err: any) {
      res.status(500).json({ message: err.toString() });
    }
  },

  async setUserRole(req: Request, res: Response) {
    const {_id, role} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors["errors"][0]["msg"] });  // returns the first error message
    }

    try {
      const user = await UserModel.findById(_id);
      if (!user) {
        logger.warn(`Set user role failed - User not found: ${_id}`);
        return res.status(404).json({ message: ERRORS.USER_NOT_FOUND }); 
      }

      if (user.role) {
        logger.warn(`Set user role failed - User already has a role: ${_id}`);
        return res.status(409).json({ message: ERRORS.USER_ROLE_EXIST });
      }

      user.role = role;
      await user.save();  

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.toString() });
    }


  },

  logoutUser(req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  },
};

export default authController;