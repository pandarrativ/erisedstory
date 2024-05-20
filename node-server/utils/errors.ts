const ERRORS = {
  ROLE_REQUIRED: 'Role is required',
  INVALID_ROLE: 'Invalid role',
  EMAIL_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email format',
  EMAIL_IN_USE: 'Email already registered',
  EMAIL_NOT_REGISTERED: 'Email not registered',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_LENGTH: 'Password must be at least 6 characters long',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  INCORRECT_PASSWORD: 'Incorrect password',
  ACCESS_FORBIDDEN: 'Access denied',
  UNAUTHENTICATED: 'Unauthenticated',
  USER_NOT_FOUND: 'User not found',

  USER_ID_REQUIRED: "User ID is required",
  USER_ROLE_EXIST: 'User already has a role assigned. Contact us to modify it!',


  INVALID_JWT_TOKEN: 'Invalid JWT token',
  GOOGLE_OAUTH_LOGIN: 'Google oauth login',
  GOOGLE_OAUTH_FAILED: 'Google oauth failed',

  INTERNAL_SERVER_ERROR: 'Internal Server Error',

  INVALID_REDIRECT: "Invalid redirect URI",
};

export default ERRORS;