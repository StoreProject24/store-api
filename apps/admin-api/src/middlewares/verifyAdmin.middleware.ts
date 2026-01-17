import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { verifyToken } from './verifyToken.middleware';
import { HttpCode } from '@shared/helpers/response/response.type';

export const verifyTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next);
  if (req.user.rol !== 'ADMIN') {
    handleError(res, HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
  }
};
