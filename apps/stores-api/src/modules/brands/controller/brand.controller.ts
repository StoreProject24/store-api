import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyStore } from '~middlewares/verifyStore';
import { BrandDomain } from '../domain/brand.domain';

export const BrandsController = Router();

BrandsController.get('/', verifyStore, async (req: Request, res: Response) => {
  try {
    const brandsDomain = new BrandDomain();
    const brands = await brandsDomain.getBrands(req.store.id);
    handleSuccess(res, 200, { brands });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
