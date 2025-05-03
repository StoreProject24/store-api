import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';

import { SaleDomain } from '../domain/sale.domain';
import {
  validatorCreateSale,
  validatorGetSaleProducts,
  validatorGetSales,
  validatorUpdateStatusSale,
} from '../validator/sale.validator';
import { SaleStatus } from '@shared/types/sale.types';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';

export const SalesController = Router();

SalesController.post(
  '/:storeId',
  [verifyTokenAdminStore, ...validatorCreateSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const body = req.body;
      const sale = await saleDomain.createSale({
        ...body,
        storeId,
      });
      handleSuccess(res, 201, { sale });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.get(
  '/:storeId/:saleId',
  [verifyTokenAdminStore, ...validatorGetSaleProducts],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const saleId = req.params.saleId;
      const sale = await saleDomain.getSaleProducts(storeId, saleId);
      handleSuccess(res, 200, { sale });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.patch(
  '/:storeId/:saleId',
  [verifyTokenAdminStore, ...validatorUpdateStatusSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const saleId = req.params.saleId;
      const body = req.body;
      const sale = await saleDomain.changeSaleStatus(storeId, saleId, body.status as unknown as SaleStatus);
      handleSuccess(res, 200, { sale });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.delete(
  '/:storeId/:saleId',
  [verifyTokenAdminStore, ...validatorUpdateStatusSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = parseInt(req.params.storeId);
      const saleId = req.params.saleId;
      await saleDomain.deleteSaleByStore(storeId, saleId);
      handleSuccess(res, 200, {});
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.get('/:storeId', [verifyTokenAdminStore, ...validatorGetSales], async (req: Request, res: Response) => {
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
    handleSuccess(res, 200, { sales });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});
