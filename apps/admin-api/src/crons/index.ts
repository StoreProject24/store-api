import {dailyCron} from './sales/daily.cron'
import {monthlyCron} from './sales/montly.cron'
import {yearlyCron} from './sales/yearly.cron'

export const initCrons = () => {
    dailyCron()
    monthlyCron()
    yearlyCron()
}