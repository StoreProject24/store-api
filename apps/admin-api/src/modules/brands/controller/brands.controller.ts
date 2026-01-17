import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { BrandsDomain } from '../domain/brands.domain';
import { validatorCreateBrand } from '../validator/brans.validator';
import { HttpCode } from '@shared/helpers/response/response.type';

export const BrandsController = Router();

BrandsController.get('/', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const brands = await brandDomain.getBrands({
      storeId: req.user.storeId,
      statusIds: [1],
    });
    handleSuccess(res, HttpCode.OK, { brands });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

BrandsController.post('/', [verifyTokenAdminStore, ...validatorCreateBrand], async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const brand = await brandDomain.createBrand({
      ...req.body,
      storeId: req.user.storeId,
    });
    handleSuccess(res, HttpCode.CREATED, { brand });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

BrandsController.post('/images', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const images = await brandDomain.uploadImageBrand(req.user.storeId, req);
    handleSuccess(res, HttpCode.CREATED, { images });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

BrandsController.patch('/:id', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const id = parseInt(req.params.id);
    const brands = await brandDomain.updateNameBrand({
      id,
      storeId: req.user.storeId,
      name: req.body.name,
      urlImage: req.body.urlImage,
    });
    handleSuccess(res, HttpCode.OK, { brands });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

BrandsController.delete('/:id', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const id = parseInt(req.params.id);
    await brandDomain.deleteBrand(id, req.user.storeId);
    handleSuccess(res, HttpCode.OK, {});
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

BrandsController.patch('/image', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const id = parseInt(req.params.id);
    const response = await brandDomain.updateImageBrand({
      id,
      urlImage: req.body.urlImage,
      storeId: req.user.storeId,
    });
    handleSuccess(res, HttpCode.OK, response);
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
