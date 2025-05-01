import { handleValidator } from '~config/helpers';
import { check, param } from 'express-validator';

export const validationCreateSubcategory = [
  check('name').isString().withMessage('name is required'),
  param('storeId').isNumeric().withMessage('storeId is required'),
  param('categoryId').isNumeric().withMessage('categoryId is required'),
  handleValidator,
];

export const validationUpdateSubcategory = [
    check('name').isString().withMessage('name is required'),
    param('storeId').isNumeric().withMessage('storeId is required'),
    param('categoryId').isNumeric().withMessage('categoryId is required'),
    param('subcategoryId').isNumeric().withMessage('subcategoryId is required'),
  handleValidator,
]

export const validationDeleteSubcategory = [
    param('storeId').isNumeric().withMessage('storeId is required'),
    param('subcategoryId').isNumeric().withMessage('subcategoryId is required'),
    handleValidator,
]
