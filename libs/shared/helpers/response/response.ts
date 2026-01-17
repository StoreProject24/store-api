import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpCode } from './response.type';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const handleSuccess = (res: Response, status: number, data: any) => {
  return res.status(status).json({
    data: {
      ...data,
    },
    status: status ?? HttpCode.OK,
  });
};

export const handleError = (res: Response, status: number, message: string) => {
  return res.status(status ?? HttpCode.INTERNAL_SERVER_ERROR).json({ error: message ?? 'Internal server error', status: status ?? HttpCode.INTERNAL_SERVER_ERROR });
};

export const handleValidator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(HttpCode.BAD_REQUEST, errors.array()[0].msg);
  }
  next();
};


export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return res.status(status).json({
    error: message,
    status,
  });
};


export class AppError<T> extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
