import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { getStoreByDomain } from '~modules/stores/repository/store.repository';
import { HttpCode } from '@shared/helpers/response/response.type';

export const verifyStore = async (req: Request, res: Response, next: NextFunction) => {
  const domain =
    req.headers["x-store-domain"] ||
    req.headers["x-forwarded-host"] ||
    req.headers.host;
  console.log("domain", domain);
  // @ts-ignore
  const hostname = new URL(domain).hostname;
  const subdomain = hostname.split(".")[0];
  const store = await getStoreByDomain(subdomain);
  console.log("store >>> ", store)
  if (!store) {
    handleError(res, HttpCode.NOT_FOUND, "Tienda no encontrada");
  }
  req.store = store;
  next();
};
