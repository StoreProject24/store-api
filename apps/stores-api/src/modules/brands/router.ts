import express from 'express';
import { BrandsController } from './controller/brand.controller';

export const brandsRouter = express.Router();

brandsRouter.use(BrandsController);
