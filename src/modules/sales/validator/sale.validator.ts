import { check, param, query } from 'express-validator';
import { handleValidator } from '~config/helpers';
import { SaleStatus } from '../types/sale.types';

export const validatorCreateSale = [
  check('items').isArray(),
  check('total').isNumeric(),
  check('userId').isNumeric(),
  check('discount').isNumeric(),
  check('status').isIn(Object.keys(SaleStatus)),
  param('storeId').isNumeric(),
  handleValidator,
];

export const validatorGetSales = [
  query('limit').isNumeric(),
  query('page').isNumeric(),
  query('status').optional().isIn(Object.keys(SaleStatus)),
  check('storeId').isNumeric(),
  handleValidator,
];

export const validatorUpdateStatusSale = [param('storeId').isNumeric(), param('saleId').isString(), handleValidator];
