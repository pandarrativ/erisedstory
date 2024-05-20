import passport, { Profile } from 'passport';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-google-oauth20';
import { IUser, UserModel } from '../models/user';
import ERRORS from '../errors';

const PORT = process.env.PORT;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

type OauthUser = {
  googleId?: string;
};

const oauthController = {
  googleLogin(req: Request, res: Response) {
    const { role } = req.query;
    const state = JSON.stringify({ role }); 
    passport.authenticate('google', { scope: ['profile', 'email'], state})(req, res);
  },

  googleCallback(req: Request, res: Response) {
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, async (err: any) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: ERRORS.GOOGLE_OAUTH_FAILED });
        return;
      }

      if (!req.user) {
        res.status(400).json({ error: ERRORS.GOOGLE_OAUTH_FAILED });
        return;
      }

      try {
        const user = await UserModel.findById((req.user as IUser).id);
        if (!user) {
          res.status(404).json({ error: ERRORS.USER_NOT_FOUND });
          return;
        }

        const state = JSON.parse(req.query.state as string || '{}');
        const { role } = state;
        if (!role && !user.role) {
          res.status(400).json({ error: ERRORS.ROLE_REQUIRED });
          return;
        }
        if (role && !user.role) {
          user.role = role;
          await user.save();
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY!, {
          expiresIn: JWT_LIFETIME,
        });
        res.cookie('token', token, { httpOnly: true });
        res.json({
          id: user.id,
          username: user.username,
          email: user.email,
          googleId: user.googleId,
          role: user.role,
          createdAt: user.createdAt,
        });
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message || err.toString() });
      }
    });
  },
};

export function configureOauthPassport() {
  passport.use(
    new Strategy(
      {
        clientID: OAUTH_CLIENT_ID!,
        clientSecret: OAUTH_CLIENT_SECRET!,
        callbackURL: `http://localhost:${PORT}/api/v1/auth/google/callback`,
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
          console.log(err);
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
      console.log(err);
      done(err);
    }
  });
}

export default oauthController;
