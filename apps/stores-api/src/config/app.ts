import express, { Application, RequestHandler } from 'express';
import 'dotenv/config';

const app: Application = express();

import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { healthCheck } from '~config/healthCheck/healthCheck';
import { salesRouter } from '~modules/sales/router';
import { storesRouter } from '~modules/stores/router';
import { productsRouter } from '~modules/products/router';
import { categoriesRouter } from '~modules/categories/router';
import { brandsRouter } from '~modules/brands/router';

import { connectMongoDb } from './mongo/mongo';
import redis from './redis/redis';
import { errorMiddleware } from '@shared/helpers/response/response';

app.set("trust proxy", 1)

app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
  })
);

connectMongoDb();
// redis();

app.use(errorMiddleware as unknown as RequestHandler);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

// @ts-ignore
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ROUTES
const apiPrefix = '/api';
app.use('/healthCheck', healthCheck);
app.use(`${apiPrefix}/categories`, categoriesRouter);
app.use(`${apiPrefix}/sales`, salesRouter);
app.use(`${apiPrefix}/brands`, brandsRouter);
app.use(`${apiPrefix}/stores`, storesRouter);
app.use(`${apiPrefix}/products`, productsRouter);

export default app;
