import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers';
import { AuthDomain } from '../domain/auth.domain';
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerifyOtp,
} from '../validator/auth.validator';
import { verifyToken } from '~middlewares/verifyToken.middleware';

export const AuthController = Router();

AuthController.post('/register', validateRegister, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const token = await authDomain.createUser(req.body);
    handleSuccess(res, 201, { token });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});

AuthController.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const token = await authDomain.loginUser(req.body.email, req.body.password);
    handleSuccess(res, 200, { token });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/forgot-password', validateForgotPassword, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    await authDomain.forgotPasswordUser(req.body.email);
    handleSuccess(res, 200, {
      message: 'Email sent',
    });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});

AuthController.post('/verify-otp', validateVerifyOtp, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    await authDomain.verifyOtpCodeUser(req.body.email, req.body.otpCode);
    handleSuccess(res, 200, { message: 'Otp code verified' });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});

AuthController.patch('/reset-password', validateResetPassword, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const { email, password, otpCode } = req.body;
    await authDomain.changePasswordUser(email, password, otpCode);
    handleSuccess(res, 200, { message: 'Otp code verified' });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});

AuthController.post('/refresh-token', verifyToken, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const token = await authDomain.refreshToken(req.user);
    handleSuccess(res, 200, { token });
  } catch (error: any) {
    handleError(res, 500, error.message);
  }
});
