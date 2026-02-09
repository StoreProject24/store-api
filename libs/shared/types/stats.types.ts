import { ObjectId } from 'mongoose';

export interface StatsBase {
  _id: ObjectId;
  storeId: number;
  totalSales: number;
  revenue: number;
  discount: number;
}

export interface DailyStats extends StatsBase {
  date: string;
}

export interface CreateDailyStats {
  storeId: number;
  date: string;
}

export interface UpdateDailyStats {
  totalSales?: number;
  revenue?: number;
  discount?: number;
}

export interface MonthlyStats extends StatsBase {
  date: string;
}

export interface CreateMonthlyStats {
  storeId: number;
  date: string;
}

export interface UpdateMonthlyStats {
  totalSales?: number;
  revenue?: number;
  discount?: number;
}

export interface YearlyStats extends StatsBase {
  year: string;
}

export interface CreateYearlyStats {
  storeId: number;
  year: string;
}

export interface UpdateYearlyStats {
  totalSales?: number;
  revenue?: number;
  discount?: number;
}
