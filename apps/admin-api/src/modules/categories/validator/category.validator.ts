import { handleValidator } from '~config/helpers';
import { check, param } from 'express-validator';

export const validatorCreateCategory = [
  param('storeId').isNumeric().withMessage('storeId is required'),
  check('name').isString().withMessage('name is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];

export const validatorGetCategories = [param('storeId').isNumeric().withMessage('storeId is required')];

export const validatorUpdateCategory = [
  param('id').isNumeric().withMessage('id is required'),
  param('storeId').isNumeric().withMessage('storeId is required'),
  check('name').isString().withMessage('name is required'),
  handleValidator,
];

export const validatorDeleteCategory = [
  param('id').isNumeric().withMessage('id is required'),
  param('storeId').isNumeric().withMessage('storeId is required'),
  handleValidator,
];

export const validatorImageCategory = [
  param('id').isNumeric().withMessage('id is required'),
  param('storeId').isNumeric().withMessage('storeId is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];
