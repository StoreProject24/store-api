import { Request, Response, NextFunction } from 'express';
import { handleSuccess, handleError } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';
import { isMongoConnected } from '../mongo/mongo';

interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  timestamp: string;
  services: {
    mongodb: boolean;
  };
}

export const healthCheck = (req: Request, res: Response, next: NextFunction): void => {
  const mongoConnected = isMongoConnected();

  const healthCheck: HealthCheckResponse = {
    status: mongoConnected ? 'healthy' : 'degraded',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      mongodb: mongoConnected,
    },
  };

  const statusCode = mongoConnected ? HttpCode.OK : HttpCode.SERVICE_UNAVAILABLE;
  handleSuccess(res, statusCode, healthCheck);
};
