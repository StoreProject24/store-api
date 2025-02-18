import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '~config/helpers/response/response';

import { verifyToken } from '~middlewares/verifyToken.middleware';
import { SaleDomain } from '../domain/sale.domain';
import { validatorCreateSale, validatorGetSales, validatorUpdateStatusSale } from '../validator/sale.validator';
import { SaleStatus } from '../types/sale.types';

export const SalesController = Router();

SalesController.post('/:storeId', [verifyToken, ...validatorCreateSale], async (req: Request, res: Response) => {
  try {
    const saleDomain = new SaleDomain();
    const storeId = parseInt(req.params.storeId);
    const body = req.body;
    const sale = await saleDomain.createSale({
      ...body,
      storeId,
    });
    return handleSuccess(res, 200, { sale });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});

SalesController.patch(
  '/:storeId/:saleId',
  [verifyToken, ...validatorUpdateStatusSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const saleId = req.params.saleId;
      const body = req.body;
      const sale = await saleDomain.changeSaleStatus(storeId, saleId, body.status as unknown as SaleStatus);
      return handleSuccess(res, 200, { sale });
    } catch (error: any) {
      return handleError(res, error.status, error.message);
    }
  }
);

SalesController.delete(
  '/:storeId/:saleId',
  [verifyToken, ...validatorUpdateStatusSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const saleId = req.params.saleId;
      await saleDomain.deleteSaleByStore(storeId, saleId);
      return handleSuccess(res, 200, {});
    } catch (error: any) {
      return handleError(res, error.status, error.message);
    }
  }
);

SalesController.get('/:storeId', [verifyToken, ...validatorGetSales], async (req: Request, res: Response) => {
  try {
    const saleDomain = new SaleDomain();
    const storeId = parseInt(req.params.storeId);
    const { limit, page, status } = req.query;
    const sales = await saleDomain.getSalesByPage(
      storeId,
      Number(limit),
      Number(page),
      status as unknown as SaleStatus
    );
    return handleSuccess(res, 200, { sales });
  } catch (error: any) {
    return handleError(res, error.status, error.message);
  }
});
