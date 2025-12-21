import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { getStoreByDomain } from '~modules/stores/repository/store.repository';

export const verifyStore = async (req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  // const subdomain = host.split('.')[0];
  const subdomain = "miempresa.com"
  const store = await getStoreByDomain(subdomain);
  if (!store) {
    handleError(res, 404, 'Store not found');
  }
  req.store = store;
  next();
};
