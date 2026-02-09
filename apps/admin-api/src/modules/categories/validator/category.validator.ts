import { handleValidator } from '@shared/helpers/response/response';
import { check, param } from 'express-validator';

export const validatorCreateCategory = [
  check('name').isString().withMessage('name is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];

export const validatorGetCategories = [];

export const validatorUpdateCategory = [
  param('id').isNumeric().withMessage('id is required'),
  check('name').isString().withMessage('name is required'),
  handleValidator,
];

export const validatorDeleteCategory = [
  param('id').isNumeric().withMessage('id is required'),
  handleValidator,
];

export const validatorImageCategory = [
  param('id').isNumeric().withMessage('id is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];
