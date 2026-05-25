import { handleValidator } from '@shared/helpers/response/response';
import { check } from 'express-validator';

export const validatorUpdateSetting = [
  check('primaryColor').optional().isString().withMessage('primaryColor must be a string'),
  check('secondaryColor').optional().isString().withMessage('secondaryColor must be a string'),
  check('show_when_out_of_stock')
    .optional()
    .isBoolean()
    .withMessage('show_when_out_of_stock must be a boolean'),
  handleValidator,
];
