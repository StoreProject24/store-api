import bcrypt from 'bcryptjs';
import { createToken } from '~config/helpers';
import { AppError } from '@shared/helpers/response/response';
import { changePassword, create, findUserByEmail, getById, saveOtpCode } from '../repository/auth.repository';
import { UserCreate, UserRefreshToken } from '../types/auth.types';
import { AuthRepository } from './auth.interface';
import { getByUserId, getStoreByIdAndUserId } from '~modules/stores/repository/store.repository';
import { sendEmail } from '~services/email/email.service';
import { HttpCode } from '@shared/helpers/response/response.type';

const STORE_APP_NAME = process.env.STORE_APP_NAME;
export class AuthDomain implements AuthRepository {
  async createUser(body: UserCreate) {
    const existUser = await findUserByEmail(body.email);
    if (existUser) {
      throw new AppError(HttpCode.CONFLICT, 'User already exists');
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
    email = email.toLocaleLowerCase()
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(HttpCode.NOT_FOUND, 'No se pudo encontrar el usuario');
    }
    const comparePassword = bcrypt.compareSync(password, existUser.password);
    if (!comparePassword) {
      throw new AppError(HttpCode.CONFLICT, 'Usuario o contraseña son incorrectos');
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
    email = email.toLocaleLowerCase()
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(HttpCode.NOT_FOUND, 'No se pudo encontrar el usuario');
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendEmail(email, 'Recuperacion de contraseña', 'otpCode', {
      otpCode,
      name: existUser.name,
      logoUrl: '',
      year: new Date().getFullYear(),
      companyName: STORE_APP_NAME,
    });
    await saveOtpCode(email, otpCode);
  }

  async verifyOtpCodeUser(email: string, otpCode: string) {
    email = email.toLocaleLowerCase()
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(HttpCode.NOT_FOUND, 'No se pudo encontrar el usuario');
    }
    if (existUser.otpCode !== otpCode) {
      throw new AppError(HttpCode.CONFLICT, 'Codigo invalido');
    }
  }

  async changePasswordUser(email: string, password: string, otpCode: string) {
    email = email.toLocaleLowerCase()
    const existUser = await findUserByEmail(email);
    if (!existUser) {
      throw new AppError(HttpCode.NOT_FOUND, 'No se pudo encontrar el usuario');
    }
    if (existUser.otpCode !== otpCode) {
      throw new AppError(HttpCode.CONFLICT, 'Codigo invalido');
    }
    const newPassword = bcrypt.hashSync(password, 10);
    await changePassword(email, newPassword);
  }

  async refreshToken(data: UserRefreshToken) {
    const store = await getByUserId(data.id);
    if (!store.length) {
      throw new AppError(HttpCode.NOT_FOUND, 'Tienda no encontrada');
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
      throw new AppError(HttpCode.NOT_FOUND, 'Tienda no encontrada');
    }
    const user = await getById(userId);
    if (!user) {
      throw new AppError(HttpCode.NOT_FOUND, 'No se pudo encontrar el usuario');
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
