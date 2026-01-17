import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { verifyToken } from './verifyToken.middleware';
import { HttpCode } from '@shared/helpers/response/response.type';

export const verifyTokenAdminStore = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next);
  console.log("req.user ", req.user)
  if (req.user.rol !== 'ADMINSTORE') {
    handleError(res, HttpCode.UNAUTHORIZED, 'No estas autorizado para esta accion');
  }
};
