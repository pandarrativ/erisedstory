import passport, { Profile } from 'passport';
import { Request, Response } from 'express';
import { Strategy } from 'passport-google-oauth20';
import { UserModel } from '../models/user';
import { IUser } from '../types';
import ERRORS from '../utils/errors';
import logger from '../utils/logger';
import validateRedirectUri, { getRedirectLocation } from '../utils/redirects';
import { OauthUser, TokenUser } from '../types';
import { createJWTCookie } from '../middleware/createJWTCookie';


// const PORT = process.env.PORT;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const HOST_NAME = process.env.HOST_NAME;


const oauthController = {
  googleLogin(req: Request, res: Response) {
    const dest: string = req.query.dest as string; // Assume redirect_uri is a string
    const redirectUrl = validateRedirectUri(dest);

    
    if (redirectUrl) {
        req.session.redirectUri = redirectUrl;  // Store the validated URL in the session
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    } else {
        logger.error("Google OAuth redirect error at location key: %O", dest);
        res.status(400).json({ message: ERRORS.INVALID_REDIRECT });
    }
  },

  googleCallback(req: Request, res: Response) {
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, async (err: any) => {
      if (err) {
        logger.error("Google OAuth callback error: %O", err);
        res.status(400).json({ message: ERRORS.GOOGLE_OAUTH_FAILED });
        return;
      }

      if (!req.user) {
        logger.warn("Google OAuth callback failed: No user returned");
        res.status(400).json({ message: ERRORS.GOOGLE_OAUTH_FAILED });
        return;
      }

      try {
        const user = await UserModel.findById((req.user as IUser)._id);
        if (!user) {
          logger.error("User not found after Google OAuth for user ID %s", (req.user as IUser)._id);
          res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
          return;
        }

        // const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY!, {
        //   expiresIn: JWT_LIFETIME,
        // });

        // res.cookie('token', token, { 
        //   httpOnly: true, 
        //   sameSite: 'lax' , //https://web.dev/articles/samesite-cookies-explained
        //   domain: DOMAIN, 
        //   // secure: true 
        // });

        // create jwt to cookie
        createJWTCookie(res, user);

        res.redirect(getRedirectLocation(req.session.redirectUri || "/"));

      } catch (err) {
        logger.error("Internal server error during Google OAuth processing: %O", err);
        res.status(500).json({ message: ERRORS.INTERNAL_SERVER_ERROR });
      }
    });
  },

  async oauthGetUserData(req: Request, res: Response){
    try {
        const user = await UserModel.findById((req.user as TokenUser).userId);
        if (!user) {
          logger.error("User not found after Google OAuth for user ID %s", (req.user as TokenUser).userId);
          res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
          return;
        }

        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          googleId: user.googleId,
          role: user.role,
          createdAt: user.createdAt,
        });

      } catch (err) {
        logger.error("Internal server error during Google OAuth processing: %O", err);
        res.status(500).json({ message: ERRORS.INTERNAL_SERVER_ERROR });
      }

  },
};

export function configureOauthPassport() {
  passport.use(
    new Strategy(
      {
        clientID: OAUTH_CLIENT_ID!,
        clientSecret: OAUTH_CLIENT_SECRET!,
        callbackURL: `${HOST_NAME}/auth/google/callback`,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        try {
          let user = await UserModel.findOne({ googleId: profile.id });

          // If user doesn't exist, create a new one
          if (!user) {
            user = new UserModel({
              email: profile.emails![0].value, // Ensure profile.emails is defined
              googleId: profile.id,
            });
            await user.save();
          }
          done(null, user);
        } catch (err: any) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user: OauthUser, done) => {
    done(null, user.googleId);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserModel.findOne({ googleId: id });
      if (!user) {
        return done(new Error(ERRORS.USER_NOT_FOUND));
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export default oauthController;