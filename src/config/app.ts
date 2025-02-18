import express, { Application } from 'express';
import 'dotenv/config';

const app: Application = express();

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

import { connectMongoDb } from './mongo/mongo';
import redis from './redis/redis';
import { categoriesRouter } from '~modules/categories/router';

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

connectMongoDb();
redis();

app.use(helmet());
app.use(cors());
app.use(function (req, res, next) {
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
app.use(apiPrefix + '/auth', authRouter);
app.use(apiPrefix + '/categories', categoriesRouter);
app.use(apiPrefix + '/user', userRouter);
app.use(apiPrefix + '/brands', brandsRouter);
app.use(apiPrefix + '/stores', storesRouter);
app.use(apiPrefix + '/products', productsRouter);
app.use(apiPrefix + '/sales', salesRouter);

export default app;
