import cron from 'node-cron';
import { StatsService } from '~modules/stats/services';

export const yearlyCron = () => {
    // 1 de enero a las 4am
    cron.schedule('0 4 1 1 *', async () => {
        const now = new Date();
        const year = now.getFullYear() - 1;
    
        const start = new Date(year, 0, 1, 0, 0, 0, 0);
        const end = new Date(year, 11, 31, 23, 59, 59, 999);
    
        await StatsService.recalculateYearly(start, end, String(year));
    });
};
