import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { SubcategoriesDomain } from '../domain/subcategories.domain';
import {
  validationCreateSubcategory,
  validationUpdateSubcategory,
  validationDeleteSubcategory,
} from '../validator/subcategories.validator';

export const SubcategoriesController = Router();

SubcategoriesController.post(
  '/',
  [verifyTokenAdminStore, ...validationCreateSubcategory],
  async (req: Request, res: Response) => {
    try {
      const subcategoriesDomain = new SubcategoriesDomain();
      const subcategory = await subcategoriesDomain.createSubcategory(req.body);
      handleSuccess(res, 201, { subcategory });
    } catch (error: any) {
      handleError(res, 404, error);
    }
  }
);

SubcategoriesController.put(
  '/:id',
  [verifyTokenAdminStore, ...validationUpdateSubcategory],
  async (req: Request, res: Response) => {
    try {
      const subcategoriesDomain = new SubcategoriesDomain();
      const storeId = Number(req.user.storeId);
      const subcategory = await subcategoriesDomain.updateSubcategory(Number(req.params.id), req.body);
      handleSuccess(res, 200, { subcategory });
    } catch (error: any) {
      handleError(res, 404, error);
    }
  }
);

SubcategoriesController.delete(
  '/:storeId/:id',
  [verifyTokenAdminStore, ...validationDeleteSubcategory],
  async (req: Request, res: Response) => {
    try {
      const subcategoriesDomain = new SubcategoriesDomain();
      await subcategoriesDomain.deleteSubcategory(Number(req.params.storeId), Number(req.params.id));
      handleSuccess(res, 200, { message: 'Subcategory deleted successfully' });
    } catch (error: any) {
      handleError(res, 404, error);
    }
  }
);
