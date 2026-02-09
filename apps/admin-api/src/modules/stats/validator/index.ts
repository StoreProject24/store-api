import { handleValidator } from '@shared/helpers/response/response';
import { check, param, query } from 'express-validator';
import { STATS_TYPES } from '../types/stats.type';



export const validatorGetStats = [
    query('type')
    .isIn(STATS_TYPES)
    .withMessage(`type must be: ${STATS_TYPES.join(' | ')}`),
    query('startDate').isString().withMessage('startDate is required'),
    query('endDate').isString().withMessage('endDate is required'),
    handleValidator,
];
  