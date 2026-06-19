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

const handleAuthError = (error: unknown, res: Response): void => {
  if (error instanceof Error && 'status' in error) {
    const typedError = error as Error & { status: number };
    handleError(res, typedError.status, error.message);
  } else {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    handleError(res, 500, errorMsg);
  }
};

AuthController.post('/register', validateRegister, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const accessTokens = await authDomain.createUser(req.body);
    handleSuccess(res, HttpCode.CREATED, accessTokens);
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.post('/login', validateLogin, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const { email, password } = req.body as { email: string; password: string };
    const accessTokens = await authDomain.loginUser(email, password);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.post('/forgot-password', validateForgotPassword, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const { email } = req.body as { email: string };
    await authDomain.forgotPasswordUser(email);
    handleSuccess(res, HttpCode.OK, {
      message: 'Email sent',
    });
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.post('/verify-otp', validateVerifyOtp, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const { email, otpCode } = req.body as { email: string; otpCode: string };
    await authDomain.verifyOtpCodeUser(email, otpCode);
    handleSuccess(res, HttpCode.OK, { message: 'Otp code verified' });
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.patch('/reset-password', validateResetPassword, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const { email, password, otpCode } = req.body as { email: string; password: string; otpCode: string };
    await authDomain.changePasswordUser(email, password, otpCode);
    handleSuccess(res, HttpCode.OK, { message: 'Password reset successfully' });
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.post('/refresh-token', verifyRefreshToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const accessTokens = await authDomain.refreshToken(req.user);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});

AuthController.post('/pick-store', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const authDomain = new AuthDomain();
    const storeId = Number((req.body as { storeId?: string }).storeId);
    const accessTokens = await authDomain.pickStore(storeId, req.user.id);
    handleSuccess(res, HttpCode.OK, accessTokens);
  } catch (error: unknown) {
    handleAuthError(error, res);
  }
});
