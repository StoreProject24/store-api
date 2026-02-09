import { check, param, query } from 'express-validator';
import { handleValidator } from '@shared/helpers/response/response';

export const validatorCreateSale = [
  check('items').isArray().withMessage('Items must be an array'),
  check('total').isNumeric().withMessage('Total must be a number'),
  check('userId').isNumeric().withMessage('User ID must be a number'),
  check('discount').isNumeric().withMessage('Discount must be a number'),
  check('statusId').isNumeric().withMessage('Status must be a valid status'),
  handleValidator,
];

export const validatorGetSales = [
  query('limit').isNumeric().withMessage('Limit must be a number'),
  query('page').isNumeric().withMessage('Page must be a number'),
  query('statusesId').isString().withMessage('Status must be a valid status'),
  check('q').isString().withMessage('Query must be a string'),
  query('dateStart').optional().isString().withMessage('Date must be a String'),
  query('dateEnd').optional().isString().withMessage('Date must be a String'),
  handleValidator,
];

export const validatorGetSaleProducts = [
  check('saleId').isString().withMessage('Sale ID must be a string'),
];

export const validatorDeleteSale = [
  param('saleId').isString().withMessage('Sale ID must be a string'),
]

export const validatorUpdateStatusSale = [
  param('saleId').isString().withMessage('Sale ID must be a string'),
  check('statusId').isNumeric().withMessage('Status must be a valid status'),
  handleValidator,
];
