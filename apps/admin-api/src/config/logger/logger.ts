import winston, { Logger, format, createLogger, transports } from 'winston';
import path from 'path';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

/**
 * Formato JSON estructurado para logs
 * Útil para parsing y análisis
 */
const jsonFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

/**
 * Formato legible para consola
 */
const consoleFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

const logger: Logger = createLogger({
  levels: logLevels,
  defaultMeta: { service: 'admin-api' },
  transports: [
    // Console output (development-friendly)
    new transports.Console({
      format: consoleFormat,
      level: process.env.LOG_LEVEL || 'info',
    }),

    // Error logs
    new transports.File({
      filename: path.join(process.cwd(), 'logs/error.log'),
      level: 'error',
      format: jsonFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // All logs
    new transports.File({
      filename: path.join(process.cwd(), 'logs/combined.log'),
      format: jsonFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),
  ],
});

// No create logs directory if it doesn't exist
if (process.env.NODE_ENV === 'production') {
  logger.info('Logger initialized in production mode');
}

export default logger;
