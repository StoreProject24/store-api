import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { ProductsDomain } from '../domain/products.domain';
import {
  validatorGetProducts,
  validationCreateProduct,
  validatorGetProductById,
  validatorUpdateProduct,
  validatorChangeStatusProduct,
  validatorUploadImagesProduct,
  validatorDeleteImageProduct,
  validatorDeleteProduct,
} from '../validator/products.validator';
import { HttpCode } from '@shared/helpers/response/response.type';

export const ProductController = Router();

ProductController.post(
  '/',
  [verifyTokenAdminStore, ...validationCreateProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const storeId = req.user.storeId;
      const product = await productDomain.createProduct({
        ...req.body,
        storeId
      });
      handleSuccess(res, HttpCode.CREATED, { product });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

ProductController.put(
  '/:productId',
  [verifyTokenAdminStore, ...validatorUpdateProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = Number(req.params.productId);
      const storeId = req.user.storeId;
      const product = await productDomain.updateProduct(productId, storeId, req.body);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.patch(
  '/:productId',
  [verifyTokenAdminStore, ...validatorChangeStatusProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = req.user.storeId;
      const product = await productDomain.changeStatusProduct(productId, storeId, req.body.status);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.post(
  '/:productId/images',
  [verifyTokenAdminStore, ...validatorUploadImagesProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = req.user.storeId;
      const userId = req.user.id;
      const images = await productDomain.uploadImages(productId, storeId, userId, req);
      handleSuccess(res, HttpCode.OK, { images });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.delete(
  '/:productId',
  [verifyTokenAdminStore, ...validatorDeleteProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = req.user.storeId;
      await productDomain.deleteProductById(productId, storeId);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.delete(
  '/images/:productId',
  [verifyTokenAdminStore, ...validatorDeleteImageProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const imagesId: number[] = req.body.imagesId;
      const productId = parseInt(req.params.productId);
      const storeId = req.user.storeId;
      await productDomain.deleteImages(imagesId, productId, storeId);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.get(
  '/:productId',
  verifyTokenAdminStore,
  validatorGetProductById,
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = req.user.storeId;
      const product = await productDomain.getProductById(storeId, productId);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.get('/', verifyTokenAdminStore, validatorGetProducts, async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductsDomain();
    const storeId = req.user.storeId;
    const { limit, page, q } = req.query;
    const { products, total } = await productDomain.getProductsByStore({
      storeId,
      limit: Number(limit),
      page: Number(page),
      q: q as string,
    });
    handleSuccess(res, HttpCode.OK, { products, total });
  } catch (error: any) {
    handleError(res, error.status, error);
  }
});
