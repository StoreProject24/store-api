import { DateTime } from 'luxon';
import { NextFunction, Request, Response } from 'express';

import { handleError } from '@shared/helpers/response/response';
import { decodeToken } from '~config/helpers/jwt/jwt';
import { HttpCode } from '@shared/helpers/response/response.type';
import { MessageError } from './verifyToken.type';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader ? bearerHeader.split(' ')[1] : null;
  try {
    if (token) {
      const tokenDecoded: any = decodeToken(token);
      const now = DateTime.now();
      const tokenExpired = DateTime.fromSeconds(tokenDecoded.exp);
      const diff = tokenExpired.diff(now, 'hour').toObject();
      if (diff?.hours! <= 0) {
        handleError(res, HttpCode.FORBIDDEN, MessageError.ERROR_TOKEN);
        return;
      }
      req.user = {
        id: tokenDecoded.user.id,
        rol: tokenDecoded.user.rol,
        email: tokenDecoded.user.email,
        name: tokenDecoded.user.name,
        statusId: tokenDecoded.user.statusId,
        storeId: tokenDecoded.user.storeId,
      };
      next();
    } else {
      handleError(res, HttpCode.FORBIDDEN, MessageError.ERROR_TOKEN_AUTHORIZATION);
    }
  } catch (error) {
    handleError(res, HttpCode.UNAUTHORIZED, MessageError.ERROR_TOKEN);
  }
};
