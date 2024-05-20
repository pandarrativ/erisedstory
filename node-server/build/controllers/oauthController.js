"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOauthPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_1 = require("../models/user");
const errors_1 = __importDefault(require("../utils/errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const redirects_1 = __importStar(require("../utils/redirects"));
const createJWTCookie_1 = require("../middleware/createJWTCookie");
// const PORT = process.env.PORT;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const HOST_NAME = process.env.HOST_NAME;
const oauthController = {
    googleLogin(req, res) {
        const dest = req.query.dest; // Assume redirect_uri is a string
        const redirectUrl = (0, redirects_1.default)(dest);
        if (redirectUrl) {
            req.session.redirectUri = redirectUrl; // Store the validated URL in the session
            passport_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res);
        }
        else {
            logger_1.default.error("Google OAuth redirect error at location key: %O", dest);
            res.status(400).json({ message: errors_1.default.INVALID_REDIRECT });
        }
    },
    googleCallback(req, res) {
        passport_1.default.authenticate('google', { failureRedirect: '/login' })(req, res, async (err) => {
            if (err) {
                logger_1.default.error("Google OAuth callback error: %O", err);
                res.status(400).json({ message: errors_1.default.GOOGLE_OAUTH_FAILED });
                return;
            }
            if (!req.user) {
                logger_1.default.warn("Google OAuth callback failed: No user returned");
                res.status(400).json({ message: errors_1.default.GOOGLE_OAUTH_FAILED });
                return;
            }
            try {
                const user = await user_1.UserModel.findById(req.user._id);
                if (!user) {
                    logger_1.default.error("User not found after Google OAuth for user ID %s", req.user._id);
                    res.status(404).json({ message: errors_1.default.USER_NOT_FOUND });
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
                (0, createJWTCookie_1.createJWTCookie)(res, user);
                res.redirect((0, redirects_1.getRedirectLocation)(req.session.redirectUri || "/"));
            }
            catch (err) {
                logger_1.default.error("Internal server error during Google OAuth processing: %O", err);
                res.status(500).json({ message: errors_1.default.INTERNAL_SERVER_ERROR });
            }
        });
    },
    async oauthGetUserData(req, res) {
        try {
            const user = await user_1.UserModel.findById(req.user.userId);
            if (!user) {
                logger_1.default.error("User not found after Google OAuth for user ID %s", req.user.userId);
                res.status(404).json({ message: errors_1.default.USER_NOT_FOUND });
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
        }
        catch (err) {
            logger_1.default.error("Internal server error during Google OAuth processing: %O", err);
            res.status(500).json({ message: errors_1.default.INTERNAL_SERVER_ERROR });
        }
    },
};
function configureOauthPassport() {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        callbackURL: `${HOST_NAME}/auth/google/callback`,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await user_1.UserModel.findOne({ googleId: profile.id });
            // If user doesn't exist, create a new one
            if (!user) {
                user = new user_1.UserModel({
                    email: profile.emails[0].value, // Ensure profile.emails is defined
                    googleId: profile.id,
                });
                await user.save();
            }
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.googleId);
    });
    passport_1.default.deserializeUser(async (id, done) => {
        try {
            const user = await user_1.UserModel.findOne({ googleId: id });
            if (!user) {
                return done(new Error(errors_1.default.USER_NOT_FOUND));
            }
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
}
exports.configureOauthPassport = configureOauthPassport;
exports.default = oauthController;
