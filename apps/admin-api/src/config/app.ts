import express, { Application } from 'express';
import 'dotenv/config';

const app: Application = express();

import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { healthCheck } from '~config/healthCheck/healthCheck';
import { brandsRouter } from '~modules/brands/router';
import { authRouter } from '~modules/auth/router';
import { storesRouter } from '~modules/stores/router';
import { productsRouter } from '~modules/products/router';
import { userRouter } from '~modules/user/router';
import { salesRouter } from '~modules/sales/router';
import { categoriesRouter } from '~modules/categories/router';

import { connectMongoDb } from './mongo/mongo';
// import redis from './redis/redis';

const authLimiter = rateLimit({
  windowMs: 15 * 50 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
  })
);

connectMongoDb();
// redis();

// @ts-ignore
// app.use(limiter);
app.use(helmet());
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

export default app;
