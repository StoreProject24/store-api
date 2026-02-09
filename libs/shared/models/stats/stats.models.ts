import { Schema, model } from 'mongoose';

const dailyStatsSchema = new Schema({
    storeId: { type: Number, required: true },
    date: { type: String, required: true },
    totalSales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }
}, { versionKey: false });

const montlyStatsSchema = new Schema({
    storeId: { type: Number, required: true },
    date: { type: String, required: true },
    totalSales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }
}, { versionKey: false });


const yearlyStatsSchema = new Schema({
    storeId: { type: Number, required: true },
    year: { type: String, required: true },
    totalSales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }
}, { versionKey: false });


export const modelYearlySales = model('yearly_stats', yearlyStatsSchema)
export const modelMonthlySales = model('monthly_stats', montlyStatsSchema)
export const modelDailySales = model('daily_stats', dailyStatsSchema)