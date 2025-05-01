import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { BrandsDomain } from '../domain/brands.domain';
import { validatorCreateBrand } from '../validator/brans.validator';

export const BrandsController = Router();

BrandsController.get('/', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const brands = await brandDomain.getBrands({
      storeId: req.user.storeId,
      statusIds: [1],
    });
    return handleSuccess(res, 201, { brands });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});

BrandsController.post(
  '/',
  [verifyTokenAdminStore, ...validatorCreateBrand],
  async (req: Request, res: Response) => {
    try {
      const brandDomain = new BrandsDomain();
      const brand = await brandDomain.createBrand({
        ...req.body,
        storeId: req.user.storeId,
      });
      return handleSuccess(res, 201, { brand });
    } catch (error: any) {
      return handleError(res, error.status, error.message);
    }
  }
);

BrandsController.post('/images', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const images = await brandDomain.uploadImageBrand(req.user.storeId, req);
    return handleSuccess(res, 201, { images });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
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
      urlImage: req.body.urlImage
    });
    return handleSuccess(res, 201, { brands });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});

BrandsController.delete('/:id', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const brandDomain = new BrandsDomain();
    const id = parseInt(req.params.id);
    await brandDomain.deleteBrand(id, req.user.storeId);
    return handleSuccess(res, 201, {});
  } catch (error: any) {
    return handleError(res, error.status, error.message);
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
    return handleSuccess(res, 201, response);
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});
