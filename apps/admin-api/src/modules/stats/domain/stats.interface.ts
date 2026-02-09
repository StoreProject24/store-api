import { StatsBase } from '@shared/types/stats.types'

export interface StatsRepository {
    // Promise<StatsBase>
  getSalesByType: (storeId: number, type: string, startDate: string, endDate: string) => any
}
