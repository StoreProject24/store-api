import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { getStoreByDomain } from '~modules/stores/repository/store.repository';
import { HttpCode } from '@shared/helpers/response/response.type';

export function extractSubdomain(domain: string) {
  let hostname = domain;
  if (!hostname.startsWith("http://") && !hostname.startsWith("https://")) {
    hostname = `https://${hostname}`;
  }
  const { hostname: cleanHost } = new URL(hostname);

  return cleanHost.split(".")[0];
}


export const verifyStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const domain =
    req.headers["x-store-domain"] ||
    req.headers["x-forwarded-host"] ||
    req.headers.host;
  // @ts-ignore
  const subdomain = extractSubdomain(domain)
  const store = await getStoreByDomain(subdomain);
  console.log("store >>> ", store)
  if (!store) {
    handleError(res, HttpCode.NOT_FOUND, "Tienda no encontrada");
  }
  req.store = store;
  next();
  } catch (error) {
    handleError(res, HttpCode.BAD_REQUEST, "Tienda no encontrada");
  }
};
