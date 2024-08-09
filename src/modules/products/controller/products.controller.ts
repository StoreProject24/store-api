import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers/response/response';
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
} from '../validator/products.validator';

export const ProductController = Router();

ProductController.post(
  '/',
  [verifyTokenAdminStore, ...validationCreateProduct],
  async (req: Request, res: Response) => {
    try {
      const productDomain = new ProductsDomain();
      const product = await productDomain.createProduct(req.body);
      handleSuccess(res, 201, { product });
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
      handleSuccess(res, 200, { product });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);

ProductController.get('/:storeId', validatorGetProducts, async (req: Request, res: Response) => {
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
    handleSuccess(res, 200, { products, total });
  } catch (error: any) {
    handleError(res, error.status, error);
  }
});

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
      handleSuccess(res, 200, { product });
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
      handleSuccess(res, 200, { product });
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
      handleSuccess(res, 200, { images });
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
      handleSuccess(res, 200, {});
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);
