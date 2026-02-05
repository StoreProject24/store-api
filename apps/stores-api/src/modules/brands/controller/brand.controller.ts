import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { BrandDomain } from '../domain/brand.domain';
import { HttpCode } from '@shared/helpers/response/response.type';

export const BrandsController = Router();

BrandsController.get('/', async (req: Request, res: Response) => {
  try {
    const brandsDomain = new BrandDomain();
    const brands = await brandsDomain.getBrands(req.store.id);
    handleSuccess(res, HttpCode.OK, { brands });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
