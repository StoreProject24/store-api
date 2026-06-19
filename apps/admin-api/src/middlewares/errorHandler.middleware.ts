import { Request, Response, NextFunction } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';

/**
 * Middleware global para manejo de errores
 * Debe ser el último middleware registrado en la aplicación
 *
 * Centraliza el manejo de diferentes tipos de errores:
 * - AppError personalizado
 * - Errores de validación
 * - JWT errors
 * - MongoDB errors
 * - Errores genéricos
 */
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log del error
  global.log?.error('Error caught by errorHandler:', {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Si ya se envió una respuesta, pasar al siguiente manejador
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = HttpCode.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';

  // Manejar AppError personalizado (con status)
  if (error instanceof Error && 'status' in error) {
    const typedError = error as Error & { status: number };
    statusCode = typedError.status;
    message = error.message;
  }
  // Manejar JWT errors
  else if (error instanceof Error) {
    if (error.name === 'JsonWebTokenError') {
      statusCode = HttpCode.UNAUTHORIZED;
      message = 'Invalid token';
    } else if (error.name === 'TokenExpiredError') {
      statusCode = HttpCode.UNAUTHORIZED;
      message = 'Token expired';
    }
    // Manejar MongoDB errors
    else if (error.message.includes('MongoDB') || error.message.includes('database')) {
      statusCode = HttpCode.SERVICE_UNAVAILABLE;
      message = 'Database connection error';
    } else {
      message = error.message;
    }
  }

  handleError(res, statusCode, message);
};
