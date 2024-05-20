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
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middleware/validation");
const authController_1 = __importDefault(require("../controllers/authController"));
const oauthController_1 = __importStar(require("../controllers/oauthController"));
const tokenAuthenticate_1 = require("../middleware/tokenAuthenticate");
const router = express_1.default.Router();
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
});
router.post('/auth/register', (0, validation_1.validateRegisterInputs)(), authController_1.default.registerUser);
router.post('/auth/login', (0, validation_1.validateLoginInputs)(), authController_1.default.loginUser);
router.post('/auth/role-selection', (0, validation_1.validateUserRoleSelection)(), authController_1.default.setUserRole);
router.post('/auth/logout', authController_1.default.logoutUser);
(0, oauthController_1.configureOauthPassport)();
router.get('/auth/google', oauthController_1.default.googleLogin);
router.get("/auth/google/callback", oauthController_1.default.googleCallback);
router.get('/auth/user-data', tokenAuthenticate_1.authenticateUserDataToken, oauthController_1.default.oauthGetUserData);
exports.default = router;
