import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';

import { SaleDomain } from '../domain/sale.domain';
import {
  validatorCreateSale,
  validatorDeleteSale,
  validatorGetSaleProducts,
  validatorGetSales,
  validatorUpdateStatusSale,
} from '../validator/sale.validator';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { HttpCode } from '@shared/helpers/response/response.type';

export const SalesController = Router();

SalesController.post(
  '/',
  [verifyTokenAdminStore, ...validatorCreateSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = req.user.storeId;
      const body = req.body;
      const sale = await saleDomain.createSale({
        ...body,
        storeId,
      });
      handleSuccess(res, HttpCode.CREATED, { sale });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.get(
  '/:saleId',
  [verifyTokenAdminStore, ...validatorGetSaleProducts],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = req.user.storeId;
      const saleId = req.params.saleId;
      const sale = await saleDomain.getSaleProducts(storeId, saleId);
      handleSuccess(res, HttpCode.OK, sale);
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.patch(
  '/:saleId',
  [verifyTokenAdminStore, ...validatorUpdateStatusSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = req.user.storeId;
      const saleId = req.params.saleId;
      const body = req.body;
      const sale = await saleDomain.changeSaleStatus(storeId, saleId, body.statusId);
      handleSuccess(res, HttpCode.OK, { sale });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.delete(
  '/:saleId',
  [verifyTokenAdminStore, ...validatorDeleteSale],
  async (req: Request, res: Response) => {
    try {
      const saleDomain = new SaleDomain();
      const storeId = req.user.storeId;
      const saleId = req.params.saleId;
      await saleDomain.deleteSaleByStore(storeId, saleId);
      handleSuccess(res, HttpCode.OK, {});
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);

SalesController.get('/', [verifyTokenAdminStore, ...validatorGetSales], async (req: Request, res: Response) => {
  try {
    const saleDomain = new SaleDomain();
    const storeId = req.user.storeId;
    const { limit, page, dateStart, dateEnd, q } = req.query;
    const statusIds = req.query.statusesId
      ? String(req.query.statusesId).split(',').map(Number)
      : []
    const query = q.toString()
    const { sales, total } = await saleDomain.getSalesByPage(
      storeId,
      Number(limit),
      Number(page),
      query,
      statusIds,
      {
        start: dateStart?.toString() || '',
        end: dateEnd?.toString() || ''
      }
    );
    handleSuccess(res, HttpCode.OK, { sales, total });
  } catch (error: any) {
    handleError(res, error?.status || 500, error?.message || 'Internal server error');
  }
});
