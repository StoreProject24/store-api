import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { getStoreByDomain } from '~modules/stores/repository/store.repository';
import { HttpCode } from '@shared/helpers/response/response.type';

export const verifyStore = async (req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  // const subdomain = host.split('.')[0];
  const subdomain = "miempresa.com"
  const store = await getStoreByDomain(subdomain);
  if (!store) {
    handleError(res, HttpCode.NOT_FOUND, "Tienda no encontrada");
  }
  req.store = store;
  next();
};
