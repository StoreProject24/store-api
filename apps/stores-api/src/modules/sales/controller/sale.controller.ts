import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';

import { SaleDomain } from '../domain/sale.domain';
import { validatorCreateSale } from '../validator/sale.validator';
import { verifyStore } from '~middlewares/verifyStore';

export const SalesController = Router();

SalesController.post('/', [verifyStore, ...validatorCreateSale], async (req: Request, res: Response) => {
  try {
    const saleDomain = new SaleDomain();
    const body = req.body;
    const sale = await saleDomain.createSale({
      ...body,
      storeId: req.store.id,
    });
    handleSuccess(res, 201, { sale });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
