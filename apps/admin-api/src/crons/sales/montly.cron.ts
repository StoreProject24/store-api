import cron from 'node-cron';
import { StatsService } from '~modules/stats/services';

export const monthlyCron = () => {
    // correr el día 1 de cada mes a las 3am
    cron.schedule('0 3 1 * *', async () => {
        const now = new Date();

        // mes anterior
        const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

        const start = new Date(year, month, 1, 0, 0, 0, 0);
        const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

        // clave tipo: 2026-02
        const date = `${year}-${String(month + 1).padStart(2, '0')}`;

        await StatsService.recalculateMonthly(start, end, date);
    });
};
