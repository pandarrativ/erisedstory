const ERRORS = {
  ROLE_REQUIRED: 'roleRequired',
  INVALID_ROLE: 'invalidRole',
  EMAIL_REQUIRED: 'emailRequired',
  INVALID_EMAIL: 'invalidEmailFormat',
  EMAIL_IN_USE: 'emailAlreadyInUse',
  EMAIL_NOT_REGISTERED: 'emailNotRegistered',
  PASSWORD_REQUIRED: 'passwordRequired',
  PASSWORD_LENGTH: 'passwordLength',
  CONFIRM_PASSWORD_REQUIRED: 'confirmPasswordRequired',
  PASSWORDS_MISMATCH: 'passwordMismatch',
  INCORRECT_PASSWORD: 'incorrectPassword',
  ACCESS_FORBIDDEN: 'accessForbidden',
  UNAUTHENTICATED: 'unauthenticated',
  USER_NOT_FOUND: 'userNotFound',

  INVALID_JWT_TOKEN: 'invalidJWTToken',
  GOOGLE_OAUTH_LOGIN: 'googleOAuthLogin',
  GOOGLE_OAUTH_FAILED: 'googleOAuthFailed',

  INTERNAL_SERVER_ERROR: 'internalServerError',
};

// TODO: this is for frontend message mapping
const MESSAGES = {
  [ERRORS.ROLE_REQUIRED]: 'Role is required',
  [ERRORS.EMAIL_REQUIRED]: 'Email is required',
  [ERRORS.INVALID_EMAIL]: 'Invalid email format',
  [ERRORS.PASSWORD_REQUIRED]: 'Password is required',
  [ERRORS.PASSWORD_LENGTH]: 'Password must be at least 5 characters long',
  [ERRORS.CONFIRM_PASSWORD_REQUIRED]: 'Confirm Password is required',
  [ERRORS.PASSWORDS_MISMATCH]: 'Passwords do not match',
  [ERRORS.EMAIL_IN_USE]: 'Email already registered',
  [ERRORS.EMAIL_NOT_REGISTERED]: 'Email not registered',
  [ERRORS.ACCESS_FORBIDDEN]: 'Access denied',
  [ERRORS.UNAUTHENTICATED]: 'Unauthenticated',
  [ERRORS.USER_NOT_FOUND]: 'User not found',

  [ERRORS.INVALID_JWT_TOKEN]: 'Invalid JWT token',
  [ERRORS.GOOGLE_OAUTH_LOGIN]: 'Registered using Google OAuth',
  [ERRORS.GOOGLE_OAUTH_FAILED]: 'Login failed using Google OAuth',

  [ERRORS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

export default ERRORS;