import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@config/helpers/handleResponse";

export const healthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  handleSuccess(res, 200, healthCheck);
};
