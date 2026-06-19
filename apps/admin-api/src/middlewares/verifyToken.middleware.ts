import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { decodeAccessToken, decodeRefreshToken } from '~config/helpers/jwt/jwt';
import { HttpCode } from '@shared/helpers/response/response.type';
import { TokenPayload } from '@shared/types/auth.types';
import { MessageError } from './verifyToken.type';

/**
 * Middleware para verificar token de acceso
 * Extrae el usuario del JWT y lo asigna a req.user
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader ? bearerHeader.split(' ')[1] : null;

  try {
    if (!token) {
      handleError(res, HttpCode.FORBIDDEN, MessageError.ERROR_TOKEN_AUTHORIZATION);
      return;
    }

    const tokenDecoded: TokenPayload = decodeAccessToken(token);

    req.user = tokenDecoded.user;
    next();
  } catch (error) {
    handleError(res, HttpCode.UNAUTHORIZED, MessageError.ERROR_TOKEN);
  }
};

/**
 * Middleware para verificar refresh token
 * Extrae el usuario del refresh token y lo asigna a req.user
 */
export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const { refreshToken } = req.body as { refreshToken?: string };

  try {
    if (!refreshToken) {
      handleError(res, HttpCode.FORBIDDEN, 'Refresh token requerido');
      return;
    }

    const tokenDecoded: TokenPayload = decodeRefreshToken(refreshToken);
    req.user = tokenDecoded.user;

    next();
  } catch (error) {
    handleError(res, HttpCode.UNAUTHORIZED, 'Refresh inválido o expirado');
  }
};