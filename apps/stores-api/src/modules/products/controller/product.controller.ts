import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyStore } from '~middlewares/verifyStore';
import { ProductDomain } from '../domain/product.domain';
import { validatorGetProductById, validatorGetProductByPage } from '../validator/product.validator';

export const ProductsController = Router();

ProductsController.get('/', [verifyStore, ...validatorGetProductByPage], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const { products, total } = await productDomain.getProductsByPage(req.store.id, page, limit);
    handleSuccess(res, 200, { products, total });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

ProductsController.get('/:id', [verifyStore, ...validatorGetProductById], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const productId = Number(req.params.id);
    const product = await productDomain.getProductById(req.store.id, productId);
    handleSuccess(res, 200, { product });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
