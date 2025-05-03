import { handleValidator } from '@shared/helpers/response/response';
import { param, query } from 'express-validator';

export const validatorGetProductByPage = [
  query('limit').isNumeric().withMessage('limit is required'),
  query('page').isNumeric().withMessage('page is required'),
  handleValidator,
];

export const validatorGetProductById = [param('id').isNumeric().withMessage('id is required')];
