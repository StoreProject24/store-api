import cron from 'node-cron';
import { StatsService } from '~modules/stats/services';

export const dailyCron = () => {
    // todos los días a las 2am
    cron.schedule('0 2 * * *', async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const start = new Date(yesterday.setHours(0, 0, 0, 0));
        const end = new Date(yesterday.setHours(23, 59, 59, 999));

        await StatsService.recalculateDaily(start, end);
    });
};
