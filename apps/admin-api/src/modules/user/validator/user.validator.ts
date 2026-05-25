import { handleValidator } from '@shared/helpers/response/response';
import { check } from 'express-validator';


export const validatorUpdateUser = [
    check('name').isString().optional().withMessage('name is required'),
    check('phone').isString().optional().withMessage('phone is required'),
    check('email').isString().optional().withMessage('email is required'),
    handleValidator,
  ];