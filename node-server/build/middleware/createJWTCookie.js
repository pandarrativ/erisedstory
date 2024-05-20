"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_LIFETIME = process.env.JWT_LIFETIME;
const DOMAIN = process.env.DOMAIN;
function createJWTCookie(res, user) {
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET_KEY, {
        expiresIn: JWT_LIFETIME,
    });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax', //https://web.dev/articles/samesite-cookies-explained
        domain: DOMAIN,
        // secure: true 
    });
}
exports.createJWTCookie = createJWTCookie;
