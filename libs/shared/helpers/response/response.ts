import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

export const handleValidator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, errors.array()[0].msg);
  }
  next();
};


export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
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
