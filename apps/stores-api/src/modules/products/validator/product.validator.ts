import { handleValidator } from '@shared/helpers/response/response';
import { param, query } from 'express-validator';

export const validatorGetProductByPage = [
  query('limit').isNumeric().withMessage('limit is required'),
  query('page').isNumeric().withMessage('page is required'),
  query('search').optional().isString().withMessage('search is required'),
  query('categoryIds').optional().isString().withMessage('categoryIds is required'),
  handleValidator,
];

export const validatorGetProductById = [param('id').isNumeric().withMessage('id is required')];

export const validatorGetRandomProduct = [
  query('limit').isNumeric().withMessage('limit is required'),
  handleValidator
];

export const validatorGetRelatedProduct = [
  param('id').isNumeric().withMessage('id is required'),
  param('categoryId').isNumeric().withMessage('categoryId is required'),
  query('limit').isNumeric().withMessage('limit is required'),
  handleValidator
];