import express from 'express';
import { CategoriesController } from './controller/categorie.controller';

export const categoriesRouter = express.Router();

categoriesRouter.use(CategoriesController);
