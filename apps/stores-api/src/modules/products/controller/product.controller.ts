import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyStore } from '~middlewares/verifyStore';
import { ProductDomain } from '../domain/product.domain';
import { validatorGetProductById, validatorGetProductByPage, validatorGetRandomProduct, validatorGetRelatedProduct } from '../validator/product.validator';

export const ProductsController = Router();

ProductsController.get('/', [verifyStore, ...validatorGetProductByPage], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = req.query.search as string;
    const categoryIds = req.query.categoryIds as string;
    const { products, total } = await productDomain.getProductsByPage(req.store.id, page, limit, search, categoryIds);
    handleSuccess(res, 200, { products, total });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

ProductsController.get('/random', [verifyStore, ...validatorGetRandomProduct], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const limit = Number(req.query.limit);
    const products = await productDomain.getRandomProduct(req.store.id, limit);
    handleSuccess(res, 200, { products });
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


ProductsController.get('/:id/:categoryId/related', [verifyStore, ...validatorGetRelatedProduct], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const productId = Number(req.params.id);
    const categoryId = Number(req.params.categoryId);
    const limit = Number(req.query.limit);
    const products = await productDomain.getRelatedProduct(req.store.id, productId, categoryId, limit);
    handleSuccess(res, 200, { products });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});