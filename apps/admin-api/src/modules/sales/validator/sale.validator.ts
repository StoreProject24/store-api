import { check, param, query } from 'express-validator';
import { handleValidator } from '@shared/helpers/response/response';
import { SaleStatus } from '@shared/types/sale.types';

export const validatorCreateSale = [
  check('items').isArray().withMessage('Items must be an array'),
  check('total').isNumeric().withMessage('Total must be a number'),
  check('userId').isNumeric().withMessage('User ID must be a number'),
  check('discount').isNumeric().withMessage('Discount must be a number'),
  check('status').isIn(Object.keys(SaleStatus)).withMessage('Status must be a valid status'),
  param('storeId').isNumeric().withMessage('Store ID must be a number'),
  handleValidator,
];

export const validatorGetSales = [
  query('limit').isNumeric().withMessage('Limit must be a number'),
  query('page').isNumeric().withMessage('Page must be a number'),
  query('status').optional().isIn(Object.keys(SaleStatus)).withMessage('Status must be a valid status'),
  check('storeId').isNumeric().withMessage('Store ID must be a number'),
  check('q').isString().withMessage('Query must be a string'),
  handleValidator,
];

export const validatorGetSaleProducts = [
  check('storeId').isNumeric().withMessage('Store ID must be a number'),
  check('saleId').isString().withMessage('Sale ID must be a string'),
];

export const validatorUpdateStatusSale = [
  param('storeId').isNumeric().withMessage('Store ID must be a number'),
  param('saleId').isString().withMessage('Sale ID must be a string'),
  handleValidator,
];
