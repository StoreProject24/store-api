import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleSuccess = (res: Response, status: number, data: any) => {
  return res.status(status).json({
    data: {
      ...data,
    },
    status: status ?? 200,
  });
};

export const handleError = (res: Response, status: number, message: string) => {
  return res.status(status ?? 500).json({ error: message ?? 'Internal server error', status: status ?? 500 });
};

export const handleValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, 400, errors.array()[0].msg);
  }
  next();
};

export class AppError<T> extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
