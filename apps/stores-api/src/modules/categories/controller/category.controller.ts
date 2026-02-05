import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { CategoryDomain } from '../domain/category.domain';
import { HttpCode } from '@shared/helpers/response/response.type';

export const CategoriesController = Router();

CategoriesController.get('/', async (req: Request, res: Response) => {
  try {
    const categoriesDomain = new CategoryDomain();
    const categories = await categoriesDomain.getCategories(req.store.id);
    handleSuccess(res, HttpCode.OK, { categories });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
