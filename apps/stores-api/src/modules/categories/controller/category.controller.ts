import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyStore } from '~middlewares/verifyStore';
import { CategoryDomain } from '../domain/category.domain';

export const CategoriesController = Router();

CategoriesController.get('/', verifyStore, async (req: Request, res: Response) => {
  try {
    const categoriesDomain = new CategoryDomain();
    const categories = await categoriesDomain.getCategories(req.store.id);
    handleSuccess(res, 200, { categories });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
