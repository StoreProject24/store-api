import { Request, Response, NextFunction } from 'express';

import { handleSuccess } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  handleSuccess(res, HttpCode.OK, healthCheck);
};
