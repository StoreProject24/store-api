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

export const handleValidator: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleError(res, 400, errors.array()[0].msg);
    return;
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
