import { UserCreate, UserRefreshToken } from '../types/auth.types';

export interface AuthRepository {
  createUser(body: UserCreate): Promise<{refreshToken: string, token: string}>;
  loginUser(email: string, password: string): Promise<{refreshToken: string, token: string}>;
  forgotPasswordUser(email: string): Promise<void>;
  verifyOtpCodeUser(email: string, otpCode: string): Promise<void>;
  changePasswordUser(email: string, password: string, otpCode: string): Promise<void>;
  refreshToken: (data: UserRefreshToken) => Promise<{refreshToken: string, token: string}>;
  pickStore:(storeId: number, userId: number) => Promise<{refreshToken: string, token: string}>;
}
