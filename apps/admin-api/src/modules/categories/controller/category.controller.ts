import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { CategoryDomain } from '../domain/category.domain';
import {
  validatorCreateCategory,
  validatorDeleteCategory,
  validatorGetCategories,
  validatorImageCategory,
  // validatorImageCategory,
  validatorUpdateCategory,
} from '../validator/category.validator';
import { HttpCode } from '@shared/helpers/response/response.type';

export const CategoriesController = Router();

CategoriesController.get('/', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const categoriesDomain = new CategoryDomain();
    const storeId = req.user.storeId;
    const categories = await categoriesDomain.getAllCategories(storeId);
    handleSuccess(res, HttpCode.OK, { categories });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

CategoriesController.post(
  '/',
  [verifyTokenAdminStore, ...validatorCreateCategory],
  async (req: Request, res: Response) => {
    try {
      const categoriesDomain = new CategoryDomain();
      const storeId = req.user.storeId;
      const category = await categoriesDomain.createCategory(storeId, req.body);
      handleSuccess(res, HttpCode.CREATED, { category });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

CategoriesController.patch(
  '/:id',
  [verifyTokenAdminStore, ...validatorUpdateCategory],
  async (req: Request, res: Response) => {
    try {
      const categoriesDomain = new CategoryDomain();
      const id = parseInt(req.params.id);
      const storeId = req.user.storeId;
      const category = await categoriesDomain.updateCategory(storeId, { id, ...req.body });
      handleSuccess(res, HttpCode.OK, { category });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

CategoriesController.post('/images', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const categoriesDomain = new CategoryDomain();
    const storeId = req.user.storeId;
    const images = await categoriesDomain.uploadImageCategory(storeId, req);
    handleSuccess(res, HttpCode.CREATED, { images });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});

CategoriesController.patch(
  '/images/:id',
  [verifyTokenAdminStore, ...validatorImageCategory],
  async (req: Request, res: Response) => {
    try {
      const categoriesDomain = new CategoryDomain();
      const id = parseInt(req.params.id);
      const storeId = req.user.storeId;
      const category = await categoriesDomain.updateImageCategory({
        categoryId: id,
        storeId,
        urlImage: req.body.urlImage,
      });
      return handleSuccess(res, HttpCode.OK, { category });
    } catch (error: any) {
      return handleError(res, error.status, error.message);
    }
  }
);

CategoriesController.delete(
  '/:id',
  [verifyTokenAdminStore, ...validatorDeleteCategory],
  async (req: Request, res: Response) => {
    try {
      const categoriesDomain = new CategoryDomain();
      const id = parseInt(req.params.id);
      const storeId = req.user.storeId;
      await categoriesDomain.deleteCategory(storeId, id);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);
