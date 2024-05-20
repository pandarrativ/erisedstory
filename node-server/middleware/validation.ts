import { body } from 'express-validator';
import ERRORS from '../utils/errors';
import { ROLES } from '../models/user';

export function validateRegisterInputs() {
  return [
    body('email')
      .notEmpty()
      .withMessage(ERRORS.EMAIL_REQUIRED)
      .if((value: string) => !!value)
      .isEmail()
      .withMessage(ERRORS.INVALID_EMAIL),
    body('password')
      .notEmpty()
      .withMessage(ERRORS.PASSWORD_REQUIRED)
      .if((value: string) => !!value)
      .isLength({ min: 6 })
      .withMessage(ERRORS.PASSWORD_LENGTH),
    body('confirmPassword')
      .notEmpty()
      .withMessage(ERRORS.CONFIRM_PASSWORD_REQUIRED)
      .custom((value: string, { req }) => {
        if (req.body.password && value && value !== req.body.password) {
          throw new Error(ERRORS.PASSWORDS_MISMATCH);
        }
        return true;
      }),
  ];
}

export function validateLoginInputs() {
  return [
    body('email')
      .notEmpty()
      .withMessage(ERRORS.EMAIL_REQUIRED)
      .if((value: string) => !!value)
      .isEmail()
      .withMessage(ERRORS.INVALID_EMAIL),
    body('password').notEmpty().withMessage(ERRORS.PASSWORD_REQUIRED),
  ];
}

export function validateUserRoleSelection() {
  return [
    body("_id").notEmpty().withMessage(ERRORS.USER_ID_REQUIRED),
    body('role').notEmpty().withMessage(ERRORS.ROLE_REQUIRED).isIn(ROLES).withMessage(ERRORS.INVALID_ROLE),
  ];
}
