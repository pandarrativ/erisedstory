import { body } from 'express-validator';
import ERRORS from '../errors';
import { ROLE } from '../models/user';

export function validateRegisterInputs() {
  return [
    body('role')
      .notEmpty()
      .withMessage(ERRORS.ROLE_REQUIRED)
      .isIn(Object.values(ROLE))
      .withMessage(ERRORS.INVALID_ROLE),
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
      .isLength({ min: 5 })
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
