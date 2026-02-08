import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { AuthDomain } from '../domain/auth.domain';
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerifyOtp,
} from '../validator/auth.validator';
import { verifyRefreshToken, verifyToken } from '~middlewares/verifyToken.middleware';
import { HttpCode } from '@shared/helpers/response/response.type';

export const AuthController = Router();

AuthController.post('/register', validateRegister, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const accessTokens = await authDomain.createUser(req.body);
    handleSuccess(res, HttpCode.CREATED, accessTokens);
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const accessTokens = await authDomain.loginUser(req.body.email, req.body.password);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/forgot-password', validateForgotPassword, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    await authDomain.forgotPasswordUser(req.body.email);
    handleSuccess(res, HttpCode.OK, {
      message: 'Email sent',
    });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/verify-otp', validateVerifyOtp, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    await authDomain.verifyOtpCodeUser(req.body.email, req.body.otpCode);
    handleSuccess(res, HttpCode.OK, { message: 'Otp code verified' });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.patch('/reset-password', validateResetPassword, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const { email, password, otpCode } = req.body;
    await authDomain.changePasswordUser(email, password, otpCode);
    handleSuccess(res, HttpCode.OK, { message: 'Otp code verified' });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/refresh-token', verifyRefreshToken, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const accessTokens = await authDomain.refreshToken(req.user);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

AuthController.post('/pick-store', verifyToken, async (req: Request, res: Response) => {
  try {
    const authDomain = new AuthDomain();
    const storeId = Number(req.body.storeId);
    const accessTokens = await authDomain.pickStore(storeId, req.user.id);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
