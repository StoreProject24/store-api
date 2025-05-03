import { handleValidator } from '@shared/helpers/response/response';
import { check, param, query } from 'express-validator';

export const validationCreateProduct = [
  check('storeId').isNumeric().withMessage('storeId is required'),
  check('name').isString().withMessage('name is required'),
  check('description').isString().withMessage('description is required'),
  check('price').isNumeric().withMessage('price is required'),
  check('quantity').isNumeric().withMessage('quantity is required'),
  check('sku').isString().withMessage('sku is required'),
  check('pricePublic').isNumeric().withMessage('pricePublic is required'),
  check('tags').isArray().optional({ nullable: true }).isNumeric().withMessage('tags is required'),
  check('categoryId').optional({ nullable: true }).isNumeric().withMessage('categoryId is required'),
  check('brandId').optional({ nullable: true }).isNumeric().withMessage('brandId is required'),
  handleValidator,
];

export const validatorGetProducts = [
  query('limit').isNumeric().withMessage('limit is required'),
  query('page').isNumeric().withMessage('page is required'),
  check('storeId').isNumeric().withMessage('storeId is required'),
  query('q').optional({ nullable: true }).isString().withMessage('name is required'),
  handleValidator,
];

export const validatorGetProductById = [
  check('storeId').isNumeric().withMessage('storeId is required'),
  param('productId').isNumeric().withMessage('productId is required'),
  handleValidator,
];

export const validatorUpdateProduct = [
  param('storeId').isNumeric().withMessage('storeId is required'),
  param('productId').isNumeric().withMessage('productId is required'),
  check('name').isString().withMessage('name is required'),
  check('description').isString().withMessage('description is required'),
  check('price').isNumeric().withMessage('price is required'),
  check('quantity').isNumeric().withMessage('quantity is required'),
  check('sku').isString().withMessage('sku is required'),
  check('pricePublic').isNumeric().withMessage('pricePublic is required'),
  check('tags').isArray().optional({ nullable: true }).isNumeric().withMessage('tags is required'),
  check('categoryId').optional({ nullable: true }).isNumeric().withMessage('categoryId is required'),
  check('brandId').optional({ nullable: true }).isNumeric().withMessage('brandId is required'),
  handleValidator,
];

export const validatorChangeStatusProduct = [
  param('productId').isNumeric().withMessage('productId is required'),
  check('status').isNumeric().withMessage('status is required'),
  handleValidator,
];

export const validatorDeleteImageProduct = [
  param('productId').isNumeric().withMessage('productId is required'),
  check('imagesId').isArray().isNumeric().withMessage('imagesId is required'),
  handleValidator,
];

export const validatorUploadImagesProduct = [
  param('productId').isNumeric().withMessage('productId is required'),
  handleValidator,
];

export const validatorDeleteProduct = [
  param('storeId').isNumeric().withMessage('storeId is required'),
  param('productId').isNumeric().withMessage('productId is required'),
  handleValidator,
];
