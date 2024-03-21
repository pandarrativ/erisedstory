import express from 'express';
import { validateLoginInputs, validateRegisterInputs } from '../middleware/validation';
import authController from '../controllers/authController';
import oauthController, { configureOauthPassport } from '../controllers/oauthController';

const router = express.Router();
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

router.post('/auth/register', validateRegisterInputs(), authController.registerUser);
router.post('/auth/login', validateLoginInputs(), authController.loginUser);
router.post('/auth/logout', authController.logoutUser);

configureOauthPassport();
router.get('/auth/google', oauthController.googleLogin);
router.get("/auth/google/callback", oauthController.googleCallback);

export default router;