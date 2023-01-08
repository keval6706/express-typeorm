import express from 'express';
import AuthController from 'controllers/AuthController';
import { loginValidations, registerValidations } from '../../validations/auth/authValidations';
import baseValidator from '../../validations/base/baseValidator';

const router = express.Router();

router.post('/register', registerValidations, baseValidator.validator, AuthController.register);
router.post('/login', loginValidations, baseValidator.validator, AuthController.login);

export default router;
