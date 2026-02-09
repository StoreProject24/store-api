export const STATS_TYPES = ['month', 'day', 'year', 'all'] as const;

export type StatsType = typeof STATS_TYPES[number];