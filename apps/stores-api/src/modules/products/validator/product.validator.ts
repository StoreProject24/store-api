import { handleValidator } from '@shared/helpers/response/response';
import { param, query } from 'express-validator';

export const validatorGetProductByPage = [
  query('limit').isNumeric().withMessage('limit is required').optional({ nullable: true }),
  query('page').isNumeric().withMessage('page is required').optional({ nullable: true }),
  query('search').optional({ nullable: true }).isString().withMessage('name is required'),
  query('categoryIds').isString().withMessage('categoryIds is required').optional({ nullable: true }),
  handleValidator,
];

export const validatorGetProductById = [param('id').isNumeric().withMessage('id is required')];

export const validatorGetRandomProducts = [query('limit').isNumeric().withMessage('limit is required')];

export const validatorGetRelatedProducts = [param('productId').isNumeric().withMessage('productId is required'), param('categoryId').isNumeric().withMessage('categoryId is required'), query('limit').isNumeric().withMessage('limit is required')];