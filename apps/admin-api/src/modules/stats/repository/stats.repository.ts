import { modelYearlySales, modelDailySales, modelMonthlySales } from "@shared/models/stats/stats.models";

export const getYearlyStats = async (
    storeId: number,
    startYear: string,
    endYear: string
  ) => {
    return modelYearlySales.find({
      storeId,
      year: {
        $gte: startYear,
        $lte: endYear,
      },
    });
  };
  

export const getMonthlyStats = async (
    storeId: number,
    startDate: string,
    endDate: string
  ) => {
    return modelMonthlySales.find({
      storeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  };

export const getDailyStats = async (
    storeId: number,
    startDate: string,
    endDate: string
  ) => {
    return modelDailySales.find({
      storeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  };
  

export const getAllStats = async (storeId: number) => {
    const stats = await modelYearlySales.findOne({
        storeId
    })
    return stats
}