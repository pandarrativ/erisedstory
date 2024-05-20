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
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const errors_1 = __importDefault(require("../utils/errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const redirects_1 = __importStar(require("../utils/redirects"));
const createJWTCookie_1 = require("../middleware/createJWTCookie");
const user_2 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authController = {
    async registerUser(req, res) {
        const { role, email, password } = req.body;
        // redirect destination
        const dest = req.query.dest;
        const redirectUrl = (0, redirects_1.default)(dest);
        if (!redirectUrl) {
            logger_1.default.error("Redirect error at location key: %O", dest);
            res.status(400).json({ message: errors_1.default.INVALID_REDIRECT });
        }
        // validation
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors["errors"][0]["msg"] }); // returns the first error message
        }
        const emailAlreadyRegistered = await user_1.UserModel.findOne({ email });
        if (emailAlreadyRegistered) {
            res.status(409).json({ message: errors_1.default.EMAIL_IN_USE });
            return;
        }
        try {
            const user = await (0, user_2.createUser)(email, password, role);
            // create jwt to cookie
            (0, createJWTCookie_1.createJWTCookie)(res, user);
            res.status(201).json({
                redirectURL: (0, redirects_1.getRedirectURI)(redirectUrl || "/")
            });
        }
        catch (err) {
            // handle error
            if (err.name === 'ValidationError') {
                const validationErrors = {};
                for (const field in err.errors) {
                    validationErrors[field] = err.errors[field].message;
                }
                res.status(400).json({ messages: validationErrors });
                return;
            }
            res.status(500).json({ message: err.toString() });
        }
    },
    async loginUser(req, res) {
        const { email, password } = req.body;
        // redirect destination
        const dest = req.query.dest;
        const redirectUrl = (0, redirects_1.default)(dest);
        if (!redirectUrl) {
            logger_1.default.error("Google OAuth redirect error at location key: %O", dest);
            res.status(400).json({ message: errors_1.default.INVALID_REDIRECT });
        }
        // validation
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors["errors"][0]["msg"] }); // returns the first error message
        }
        try {
            const user = await user_1.UserModel.findOne({ email });
            if (!user) {
                res.status(401).json({ message: errors_1.default.EMAIL_NOT_REGISTERED });
                return;
            }
            if (!user.hashedPassword) {
                res.status(401).json({ message: errors_1.default.GOOGLE_OAUTH_LOGIN });
                return;
            }
            const passwordMatch = await bcrypt_1.default.compare(password, user.hashedPassword);
            if (!passwordMatch) {
                res.status(401).json({ message: errors_1.default.INCORRECT_PASSWORD });
                return;
            }
            // create jwt to cookie
            (0, createJWTCookie_1.createJWTCookie)(res, user);
            res.status(201).json({
                redirectURL: (0, redirects_1.getRedirectURI)(redirectUrl || "/")
            });
        }
        catch (err) {
            res.status(500).json({ message: err.toString() });
        }
    },
    async setUserRole(req, res) {
        const { _id, role } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors["errors"][0]["msg"] }); // returns the first error message
        }
        try {
            const user = await user_1.UserModel.findById(_id);
            if (!user) {
                logger_1.default.warn(`Set user role failed - User not found: ${_id}`);
                return res.status(404).json({ message: errors_1.default.USER_NOT_FOUND });
            }
            if (user.role) {
                logger_1.default.warn(`Set user role failed - User already has a role: ${_id}`);
                return res.status(409).json({ message: errors_1.default.USER_ROLE_EXIST });
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
        }
        catch (err) {
            res.status(500).json({ message: err.toString() });
        }
    },
    logoutUser(req, res) {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    },
};
exports.default = authController;
