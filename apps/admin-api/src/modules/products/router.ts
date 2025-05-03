import express from 'express';
import { ProductController } from './controller/products.controller';

export const productsRouter = express.Router();

productsRouter.use(ProductController);
