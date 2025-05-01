import { Request, Response, NextFunction } from 'express';

import { handleSuccess } from '~config/helpers/response/response';

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  handleSuccess(res, 200, healthCheck);
};
