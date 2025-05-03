import { check } from 'express-validator';
import { handleValidator } from '@shared/helpers/response/response';
import { SaleStatus } from '@shared/types/sale.types';

export const validatorCreateSale = [
  check('items').isArray().withMessage('Items must be an array'),
  check('total').isNumeric().withMessage('Total must be a number'),
  check('discount').isNumeric().withMessage('Discount must be a number'),
  check('status').isIn([SaleStatus.pending]).withMessage('Status must be pending'),
  handleValidator,
];
