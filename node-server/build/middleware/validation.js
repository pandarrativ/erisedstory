"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRoleSelection = exports.validateLoginInputs = exports.validateRegisterInputs = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = __importDefault(require("../utils/errors"));
const user_1 = require("../models/user");
function validateRegisterInputs() {
    return [
        (0, express_validator_1.body)('email')
            .notEmpty()
            .withMessage(errors_1.default.EMAIL_REQUIRED)
            .if((value) => !!value)
            .isEmail()
            .withMessage(errors_1.default.INVALID_EMAIL),
        (0, express_validator_1.body)('password')
            .notEmpty()
            .withMessage(errors_1.default.PASSWORD_REQUIRED)
            .if((value) => !!value)
            .isLength({ min: 6 })
            .withMessage(errors_1.default.PASSWORD_LENGTH),
        (0, express_validator_1.body)('confirmPassword')
            .notEmpty()
            .withMessage(errors_1.default.CONFIRM_PASSWORD_REQUIRED)
            .custom((value, { req }) => {
            if (req.body.password && value && value !== req.body.password) {
                throw new Error(errors_1.default.PASSWORDS_MISMATCH);
            }
            return true;
        }),
    ];
}
exports.validateRegisterInputs = validateRegisterInputs;
function validateLoginInputs() {
    return [
        (0, express_validator_1.body)('email')
            .notEmpty()
            .withMessage(errors_1.default.EMAIL_REQUIRED)
            .if((value) => !!value)
            .isEmail()
            .withMessage(errors_1.default.INVALID_EMAIL),
        (0, express_validator_1.body)('password').notEmpty().withMessage(errors_1.default.PASSWORD_REQUIRED),
    ];
}
exports.validateLoginInputs = validateLoginInputs;
function validateUserRoleSelection() {
    return [
        (0, express_validator_1.body)("_id").notEmpty().withMessage(errors_1.default.USER_ID_REQUIRED),
        (0, express_validator_1.body)('role').notEmpty().withMessage(errors_1.default.ROLE_REQUIRED).isIn(user_1.ROLES).withMessage(errors_1.default.INVALID_ROLE),
    ];
}
exports.validateUserRoleSelection = validateUserRoleSelection;
