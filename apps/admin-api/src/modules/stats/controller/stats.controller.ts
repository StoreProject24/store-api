import { HttpCode } from '@shared/helpers/response/response.type';
import { Request, Response, Router } from 'express';
import { validatorGetStats } from '../validator';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { StatsDomain } from '../domain/stats.domain';
import { StatsType } from '../types/stats.type';

export const StatsController = Router();


StatsController.get(
    '/',
    [verifyTokenAdminStore, ...validatorGetStats],
    async (req: Request, res: Response) => {
        try {
            const statsDomain = new StatsDomain();

            const storeId = req.user.storeId;
            const { type, startDate, endDate } = req.query as {
                type: StatsType;
                startDate: string;
                endDate: string;
            };

            const data = await statsDomain.getSalesByType(
                storeId,
                type,
                startDate,
                endDate
            );

            handleSuccess(res, HttpCode.OK, data);
        } catch (error: any) {
            handleError(res, error.status, error.message);
        }
    }
);

StatsController.get(
    '/analitics',
    [verifyTokenAdminStore],
    async (req: Request, res: Response) => {
        try {
            const statsDomain = new StatsDomain();
            const storeId = req.user.storeId;
            const data = await statsDomain.getAnalytics(storeId);
            handleSuccess(res, HttpCode.OK, data);
        } catch (error: any) {
            handleError(res, error.status, error.message);
        }
    }
);