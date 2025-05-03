import { handleValidator } from '@shared/helpers/response/response';
import { check } from 'express-validator';

export const validatorCreateBrand = [
  check('name').isString().withMessage('name is required'),
  check('urlImage').isString().withMessage('urlImage is required'),
  handleValidator,
];
