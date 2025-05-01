import express from 'express';
import { CategoriesController } from './controller/category.controller';

export const categoriesRouter = express.Router();

categoriesRouter.use(CategoriesController);
