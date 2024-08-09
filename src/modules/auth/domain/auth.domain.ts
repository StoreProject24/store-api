import bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { AppError, createToken } from '~config/helpers';
import { changePassword, create, findUserByEmail, saveOtpCode } from '../repository/auth.repository';
import { UserCreate, UserRefreshToken } from '../types/auth.types';
import { AuthRepository } from './auth.interface';
import { getByUserId } from '~modules/stores/repository/store.repository';

export class AuthDomain implements AuthRepository {
  async createUser(body: UserCreate) {
    const existUser = await findUserByEmail(body.email);
    if (existUser) {
      throw new AppError(409, 'User already exists');
    }
    const newPassword = bcrypt.hashSync(body.password, 10);
    const user = await create({
      ...body,
      password: newPassword,
    });
    const token = createToken({ ...user });
    return token;
  }
  async loginUser(email: string, password: string) {
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(404, 'User not found');
    }
    const comparePassword = bcrypt.compareSync(password, existUser.password);
    if (!comparePassword) {
      throw new AppError(409, 'Invalid user or password');
    }
    const token = createToken({
      id: existUser.id,
      email: existUser.email,
      name: existUser.name,
      rol: existUser.role,
      statusId: existUser.statusId,
    });
    return token;
  }

  async forgotPasswordUser(email: string) {
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(404, 'User not found');
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    // TODO:: send email with otp code
    await saveOtpCode(email, otpCode);
  }

  async verifyOtpCodeUser(email: string, otpCode: string) {
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(404, 'User not found');
    }
    if (existUser.otpCode !== otpCode) {
      throw new AppError(409, 'Invalid otp code');
    }
  }

  async changePasswordUser(email: string, password: string, otpCode: string) {
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(404, 'User not found');
    }
    if (existUser.otpCode !== otpCode) {
      throw new AppError(409, 'Invalid otp code');
    }
    const newPassword = bcrypt.hashSync(password, 10);
    await changePassword(email, newPassword);
  }

  async refreshToken(data: UserRefreshToken) {
    const store = await getByUserId(data.id);
    if (!store.length) {
      throw new AppError(404, 'Store not found');
    }
    const token = createToken({
      id: data.id,
      email: data.email,
      name: data.name,
      rol: data.rol,
      statusId: data.statusId,
      storeId: store[0].id,
    });
    return token;
  }
}
