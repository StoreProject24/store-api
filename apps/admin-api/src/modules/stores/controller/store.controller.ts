import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { verifyToken } from '~middlewares/verifyToken.middleware';
import { StoreDomain } from '../domain/store.domain';
import {
  validationCreateStore,
  validationDeleteStore,
  validationUpdateStore,
  validationUploadImageStore,
} from '../validator/store.validator';
import { FieldStore } from '@shared/types/store.types';
import { HttpCode } from '@shared/helpers/response/response.type';

export const StoreController = Router();

StoreController.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const stores = await storeDomain.getStoreByIdUser(req.user.id);
    handleSuccess(res, HttpCode.OK, { stores });
  } catch (error: any) {
    handleError(res, error.status, error);
  }
});

StoreController.get('/:idStore', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const idStore = Number(req.params.idStore);
    const store = await storeDomain.getStoreById(idStore);
    handleSuccess(res, HttpCode.OK, { store });
  } catch (error: any) {
    handleError(res, error.status, error);
  }
});

StoreController.post('/', [verifyToken, ...validationCreateStore], async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const userId = req.user.id;
    const store = await storeDomain.createStore({ ...req.body, userId });
    handleSuccess(res, HttpCode.CREATED, { store });
  } catch (error: any) {
    handleError(res, error.status, error);
  }
});

StoreController.put('/', [verifyToken, ...validationUpdateStore], async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const store = await storeDomain.createStore(req.body);
    handleSuccess(res, HttpCode.OK, { store });
  } catch (error: any) {
    handleError(res, error.status, error);
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
      handleSuccess(res, HttpCode.OK, { store });
    } catch (error: any) {
      handleError(res, error.status, error);
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
      handleSuccess(res, HttpCode.CREATED, { store });
    } catch (error: any) {
      handleError(res, error.status, error);
    }
  }
);
