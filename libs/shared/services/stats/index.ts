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

    private static async aggregateForStore(
        storeId: number,
        start: Date,
        end: Date
    ) {
        const result = await salesModel.aggregate([
            {
                $match: {
                    storeId,
                    createdAt: { $gte: start, $lte: end },
                    statusId: STATUS.paid,
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: 1 },
                    revenue: { $sum: '$total' },
                    discount: { $sum: '$discount' },
                },
            },
        ]);
        return result[0] ?? { totalSales: 0, revenue: 0, discount: 0 };
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

    static async recalculateDailyByStore(
        storeId: number,
        start: Date,
        end: Date
    ) {
        const date = start.toISOString().slice(0, 10);

        const result = await this.aggregateForStore(storeId, start, end);

        await modelDailySales.updateOne(
            { storeId, date },
            {
                totalSales: result.totalSales,
                revenue: result.revenue,
                discount: result.discount,
            },
            { upsert: true }
        );
    }

    static async recalculateMonthlyByStore(
        storeId: number,
        start: Date,
        end: Date,
        date: string
    ) {
        const result = await this.aggregateForStore(storeId, start, end);

        await modelMonthlySales.updateOne(
            { storeId, date },
            {
                totalSales: result.totalSales,
                revenue: result.revenue,
                discount: result.discount,
            },
            { upsert: true }
        );
    }
    static async recalculateYearlyByStore(
        storeId: number,
        start: Date,
        end: Date,
        year: string
    ) {
        const result = await this.aggregateForStore(storeId, start, end);

        await modelYearlySales.updateOne(
            { storeId, year },
            {
                totalSales: result.totalSales,
                revenue: result.revenue,
                discount: result.discount,
            },
            { upsert: true }
        );
    }

}
