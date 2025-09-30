import { NextFunction, Request, Response } from 'express';
import { handleError } from '@shared/helpers/response/response';
import { getStoreByDomain } from '~modules/stores/repository/store.repository';

export const verifyStore = async (req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  console.log('host', host)
  // let subdomain = host.split('.')[0];
  let subdomain = 'test1'
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  // console.log('subdomain', subdomain)
  // if (process.env.NODE_ENV === 'development'){
  //   subdomain = 'test1'
  // }
  const store = await getStoreByDomain(subdomain);
  console.log('store', store)
  if (!store) {
    handleError(res, 404, 'Store not found');
    return
  }
  req.store = store;
  next();
};
