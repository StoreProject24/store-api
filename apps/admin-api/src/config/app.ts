import express, { Application } from 'express';
import 'dotenv/config';

const app: Application = express();

import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import {initCrons} from '../crons/index'
import { healthCheck } from '~config/healthCheck/healthCheck';
import { brandsRouter } from '~modules/brands/router';
import { authRouter } from '~modules/auth/router';
import { storesRouter } from '~modules/stores/router';
import { productsRouter } from '~modules/products/router';
import { userRouter } from '~modules/user/router';
import { salesRouter } from '~modules/sales/router';
import { categoriesRouter } from '~modules/categories/router';
import { statsRouter } from '~modules/stats/router';
import { settingsRouter } from '~modules/settings/router';

import { connectMongoDb } from './mongo/mongo';
import { errorHandler } from '~middlewares/errorHandler.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger';
// import redis from './redis/redis';

// Rate limiting for authentication endpoints (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes (fixed: was 15 * 50 * 1000 = 12.5 min)
  limit: 50, // 50 requests per 15 minutes for auth
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many login attempts, please try again later',
});

// Rate limiting for general app endpoints
const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // 500 requests per 15 minutes
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

// HTTP request logging - log all requests in dev, only errors in prod
const morganFormat = process.env.NODE_ENV === 'production' ? 'short' : 'dev';
app.use(
  morgan(morganFormat, {
    skip: (req, res) => {
      // Skip health checks and low-level logs in production
      if (process.env.NODE_ENV === 'production') {
        return req.path === '/healthCheck' || res.statusCode < 400;
      }
      return false;
    },
  })
);

connectMongoDb();
initCrons();
// redis();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
    displayOperationId: true,
  }
}));

// ROUTES
const apiPrefix = '/api';
app.use('/healthCheck', healthCheck);
app.use(`${apiPrefix}/auth`, authLimiter, authRouter);
app.use(`${apiPrefix}/categories`, appLimiter, categoriesRouter);
app.use(`${apiPrefix}/user`, appLimiter, userRouter);
app.use(`${apiPrefix}/brands`, appLimiter, brandsRouter);
app.use(`${apiPrefix}/stores`, appLimiter, storesRouter);
app.use(`${apiPrefix}/products`, appLimiter, productsRouter);
app.use(`${apiPrefix}/sales`, appLimiter, salesRouter);
app.use(`${apiPrefix}/stats`, appLimiter, statsRouter)
app.use(`${apiPrefix}/settings`, appLimiter, settingsRouter)

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
