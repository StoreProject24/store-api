import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyStore } from '~middlewares/verifyStore';
import { StoreDomain } from '../domain/store.domain';

export const StoreController = Router();

StoreController.get('/', verifyStore, async (req: Request, res: Response) => {
  try {
    const storeDomain = new StoreDomain();
    const store = await storeDomain.getStore(req.store.id);
    handleSuccess(res, 200, { store });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
