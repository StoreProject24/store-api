import { User, UserCreate, UserRefreshToken } from "../types/auth.types";

export interface AuthRepository {
	createUser(body: UserCreate): Promise<string>;
	loginUser(email: string, password: string): Promise<string>;
	forgotPasswordUser(email: string): Promise<void>;
	verifyOtpCodeUser(email: string, otpCode: string): Promise<void>;
	changePasswordUser(
		email: string,
		password: string,
		otpCode: string
	): Promise<void>;
	refreshToken: (data: UserRefreshToken) => Promise<string>;
}
