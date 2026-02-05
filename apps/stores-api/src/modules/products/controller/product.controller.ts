import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { ProductDomain } from '../domain/product.domain';
import { validatorGetProductById, validatorGetProductByPage, validatorGetRandomProducts, validatorGetRelatedProducts } from '../validator/product.validator';
import { HttpCode } from '@shared/helpers/response/response.type';

export const ProductsController = Router();

ProductsController.get('/', [...validatorGetProductByPage], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const q = req.query.search as string || '';
    const categoryIds = req.query.categoryIds ? (req.query.categoryIds as string).split(',').map(Number) : [];
    const { products, total } = await productDomain.getProductsByPage(req.store.id, page, limit, q, categoryIds);
    handleSuccess(res, HttpCode.OK, { products, total });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});


ProductsController.get('/random', [...validatorGetRandomProducts], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const limit = Number(req.query.limit);
    const products = await productDomain.getRandomProducts(req.store.id, limit);
    handleSuccess(res, HttpCode.OK, { products });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

ProductsController.get('/:productId/:categoryId/related', [...validatorGetRelatedProducts], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const productId = Number(req.params.productId);
    const limit = Number(req.query.limit);
    const categoryId = Number(req.query.categoryId)
    const products = await productDomain.getRelatedProducts(req.store.id, productId, categoryId, limit);
    handleSuccess(res, HttpCode.OK, { products });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

ProductsController.get('/:id', [...validatorGetProductById], async (req: Request, res: Response) => {
  try {
    const productDomain = new ProductDomain();
    const productId = Number(req.params.id);
    const product = await productDomain.getProductById(req.store.id, productId);
    handleSuccess(res, HttpCode.OK, { product });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
