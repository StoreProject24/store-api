import express from 'express';
import { SalesController } from './controller/sale.controller';

export const salesRouter = express.Router();

salesRouter.use(SalesController);
