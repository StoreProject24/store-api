import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';

import { SaleDomain } from '../domain/sale.domain';
import { validatorCreateSale } from '../validator/sale.validator';
import { HttpCode } from '@shared/helpers/response/response.type';

export const SalesController = Router();

SalesController.post('/', [...validatorCreateSale], async (req: Request, res: Response) => {
  try {
    const saleDomain = new SaleDomain();
    const body = req.body;
    const sale = await saleDomain.createSale({
      ...body,
      storeId: req.store.id,
    });
    handleSuccess(res, HttpCode.CREATED, {sale});
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
