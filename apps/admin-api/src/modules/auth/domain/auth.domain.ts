import bcrypt from 'bcryptjs';
import { createToken } from '~config/helpers';
import { AppError } from '@shared/helpers/response/response';
import { changePassword, create, findUserByEmail, getById, saveOtpCode } from '../repository/auth.repository';
import { UserCreate, UserRefreshToken } from '../types/auth.types';
import { AuthRepository } from './auth.interface';
import { getByUserId, getStoreByIdAndUserId } from '~modules/stores/repository/store.repository';
import { sendEmail } from '~services/email/email.service';

const STORE_APP_NAME = process.env.STORE_APP_NAME;
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
    const token = createToken(user);
    await sendEmail(body.email, 'Bienvenido a Store', 'welcome', {
      communityName: 'Store Admin',
      name: body.name,
      url: 'www.google.com',
      year: new Date().getFullYear(),
    });
    return token;
  }
  async loginUser(email: string, password: string) {
    const existUser = await findUserByEmail(email);
    console.log("existUser ", existUser);
    if (!existUser) {
      throw new AppError(404, 'User not found');
    }
    const comparePassword = bcrypt.compareSync(password, existUser.password);
    console.log("comparePassword ", comparePassword);
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
    await sendEmail(email, 'Recuperacion de contrasena', 'otpCode', {
      otpCode,
      name: existUser.name,
      logoUrl: '',
      year: new Date().getFullYear(),
      companyName: STORE_APP_NAME,
    });
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

  async pickStore(storeId: number, userId: number) {
    const store = await getStoreByIdAndUserId(storeId, userId);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    const user = await getById(userId);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    const token = createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      rol: user.role,
      statusId: user.statusId,
      storeId: store.id,
    });
    return token;
  }
}
