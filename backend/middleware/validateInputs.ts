import { body } from "express-validator";

export function validateRegisterInputs() {
  return [
    body("role")
      .notEmpty().withMessage("Role is required"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .if((value: string) => !!value)
      .isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .if((value: string) => !!value)
      .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("confirmPassword")
      .notEmpty().withMessage("Confirm Password is required")
      .custom((value: string, { req }) => {
        if (req.body.password && value && value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ];
}
