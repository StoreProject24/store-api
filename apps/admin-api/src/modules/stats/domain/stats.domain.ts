import { AppError } from "@shared/helpers/response/response";
import { HttpCode } from "@shared/helpers/response/response.type";
import { getAllStats, getDailyStats, getMonthlyStats, getYearlyStats } from "../repository/stats.repository"
import { StatsType } from '../types/stats.type'
import { StatsRepository } from "./stats.interface";
import { isStatsType } from "../utils/fn";
import { AnalyticsService } from "~services/analitics";


export class StatsDomain implements StatsRepository {
    async getSalesByType(storeId: number, type: StatsType, startDate: string, endDate: string) {
        if (!isStatsType(type)) {
            throw new AppError(HttpCode.NOT_FOUND, 'Tipo invalido');
        }
        const strategies = {
            all: () => getAllStats(storeId),
            day: () => getDailyStats(storeId, startDate, endDate),
            month: () => getMonthlyStats(storeId, startDate, endDate),
            year: () => getYearlyStats(storeId, startDate, endDate),
        };

        return strategies[type]();
    }

    async getAnalytics(storeId: number) {
        const analytics = new AnalyticsService();
        const data = await analytics.getAnalytics(storeId);
        return data;
    }
}