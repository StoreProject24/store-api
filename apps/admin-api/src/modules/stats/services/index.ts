import salesModel from '@shared/models/sale/sale.model';
import {
    modelDailySales,
    modelMonthlySales,
    modelYearlySales,
} from '@shared/models/stats/stats.models';
import { STATUS } from '@shared/types/status.types';

export class StatsService {
    private static async aggregateByStore(start: Date, end: Date) {
        return salesModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lte: end },
                    statusId: STATUS.paid,
                },
            },
            {
                $group: {
                    _id: '$storeId',
                    totalSales: { $sum: 1 },
                    revenue: { $sum: '$total' },
                    discount: { $sum: '$discount' },
                },
            },
        ]);
    }

    static async recalculateDaily(start: Date, end: Date) {
        const date = start.toISOString().slice(0, 10);

        const results = await this.aggregateByStore(start, end);

        for (const result of results) {
            await modelDailySales.updateOne(
                { storeId: result._id, date },
                {
                    totalSales: result.totalSales,
                    revenue: result.revenue,
                    discount: result.discount,
                },
                { upsert: true }
            );
        }
    }

    static async recalculateMonthly(start: Date, end: Date, date: string) {
        const results = await this.aggregateByStore(start, end);

        for (const result of results) {
            await modelMonthlySales.updateOne(
                { storeId: result._id, date },
                {
                    totalSales: result.totalSales,
                    revenue: result.revenue,
                    discount: result.discount,
                },
                { upsert: true }
            );
        }
    }

    static async recalculateYearly(start: Date, end: Date, year: string) {
        const results = await this.aggregateByStore(start, end);

        for (const result of results) {
            await modelYearlySales.updateOne(
                { storeId: result._id, year },
                {
                    totalSales: result.totalSales,
                    revenue: result.revenue,
                    discount: result.discount,
                },
                { upsert: true }
            );
        }
    }
}
