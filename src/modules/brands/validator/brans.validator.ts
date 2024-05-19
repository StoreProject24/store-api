import { handleValidator } from '~config/helpers';
import { check, param } from 'express-validator';

export const validatorCreateBrand = [
  check('storeId').isNumeric().withMessage('storeId is required'),
  check('name').isString().withMessage('name is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];

export const validatorGetBrand = [param('storeId').isNumeric().withMessage('storeId is required')];
