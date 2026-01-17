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
      const product = await productDomain.createProduct(req.body);
      handleSuccess(res, HttpCode.CREATED, { product });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

ProductController.put(
  '/:storeId/:productId',
  [verifyTokenAdminStore, ...validatorUpdateProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = Number(req.params.productId);
      const storeId = Number(req.params.storeId);
      const product = await productDomain.updateProduct(productId, storeId, req.body);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.patch(
  '/:storeId/:productId',
  [verifyTokenAdminStore, ...validatorChangeStatusProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = parseInt(req.params.storeId);
      const product = await productDomain.changeStatusProduct(productId, storeId, req.body.status);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.post(
  '/:storeId/:productId/images',
  [verifyTokenAdminStore, ...validatorUploadImagesProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = parseInt(req.params.storeId);
      const userId = req.user.id;
      const images = await productDomain.uploadImages(productId, storeId, userId, req);
      handleSuccess(res, HttpCode.OK, { images });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.delete(
  '/:storeId/productId/:productId',
  [verifyTokenAdminStore, ...validatorDeleteProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = parseInt(req.params.storeId);
      await productDomain.deleteProductById(productId, storeId);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.delete(
  '/:storeId/images/:productId',
  [verifyTokenAdminStore, ...validatorDeleteImageProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const imagesId: number[] = req.body.imagesId;
      const productId = parseInt(req.params.productId);
      const storeId = parseInt(req.params.storeId);
      await productDomain.deleteImages(imagesId, productId, storeId);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.get(
  '/:storeId/product/:productId',
  verifyTokenAdminStore,
  validatorGetProductById,
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const productId = parseInt(req.params.productId);
      const storeId = parseInt(req.params.storeId);
      const product = await productDomain.getProductById(storeId, productId);
      handleSuccess(res, HttpCode.OK, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.get('/:storeId', verifyTokenAdminStore, validatorGetProducts, async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductsDomain();
    const storeId = parseInt(req.params.storeId);
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
