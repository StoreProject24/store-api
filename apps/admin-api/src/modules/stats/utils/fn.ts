import { STATS_TYPES, StatsType } from "../types/stats.type";

export const isStatsType = (value: string): value is StatsType => {
    return STATS_TYPES.includes(value as StatsType);
  };