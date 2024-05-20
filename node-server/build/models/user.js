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
exports.UserModel = exports.createUser = exports.ROLES = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.ROLES = ['student', 'parent', 'educator', 'admin'];
const UserSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.UUID,
        default: uuid_1.v4
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        minlength: 4,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
        index: true,
        unique: true,
        sparse: true, // This makes the index only consider documents where googleId exists
    },
    username: {
        type: String,
    },
    role: {
        type: String,
        enum: exports.ROLES,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
});
UserSchema.pre('save', function (next) {
    if (!this.username && this.email) {
        this.username = this.email.split('@')[0];
    }
    next();
});
// for oauth create user 
async function createUser(email, password, role) {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new exports.UserModel({
            email,
            hashedPassword,
            role,
        });
        await user.save();
        return user;
    }
    catch (err) {
        throw err;
    }
}
exports.createUser = createUser;
exports.UserModel = mongoose_1.default.model('User', UserSchema);
