import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { verifytoken } from '~middlewares/verifyToken.middleware';
import { StoreDomain } from '../domain/store.domain';
import {
  validationCreateStore,
  validationDeleteStore,
  validationUpdateStore,
  validationUploadImageStore,
} from '../validator/store.validator';
import { FieldStore } from '../types/store.types';

export const StoreController = Router();

StoreController.get('/', verifytoken, async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const stores = await storeDomain.getStoreByIdUser(req.user.id);
    handleSuccess(res, 200, { stores });
  } catch (error: any) {
    handleError(res, 404, error);
  }
});

StoreController.get('/:idStore', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const idStore = Number(req.params.idStore);
    const store = await storeDomain.getStoreById(idStore);
    handleSuccess(res, 200, { store });
  } catch (error: any) {
    handleError(res, 404, error);
  }
});

StoreController.post('/', [verifytoken, ...validationCreateStore], async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const userId = req.user.id;
    const store = await storeDomain.createStore({ ...req.body, userId });
    handleSuccess(res, 201, { store });
  } catch (error: any) {
    handleError(res, 404, error);
  }
});

StoreController.put('/', [verifytoken, ...validationUpdateStore], async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const store = await storeDomain.createStore(req.body);
    handleSuccess(res, 201, { store });
  } catch (error: any) {
    handleError(res, 404, error);
  }
});

StoreController.patch(
  '/:id',
  [verifyTokenAdminStore, ...validationDeleteStore],
  async (req: Request, res: Response) => {
    try {
      const storeDomain = new StoreDomain();
      const id = parseInt(req.params.id);
      const store = await storeDomain.deleteStore(id);
      handleSuccess(res, 201, { store });
    } catch (error: any) {
      handleError(res, 404, error);
    }
  }
);

StoreController.post(
  '/:storeId/image',
  [verifyTokenAdminStore, ...validationUploadImageStore],
  async (req: Request, res: Response) => {
    try {
      const storeDomain = new StoreDomain();
      const field = req.query.field as FieldStore['field'];
      const storeId = parseInt(req.params.storeId);
      const store = await storeDomain.uploadImage(req.user.id, storeId, field, req);
      handleSuccess(res, 201, { store });
    } catch (error: any) {
      handleError(res, 404, error);
    }
  }
);
