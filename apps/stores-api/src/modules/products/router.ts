import express from 'express';
import { ProductsController } from './controller/product.controller';

export const productsRouter = express.Router();

productsRouter.use(ProductsController);
