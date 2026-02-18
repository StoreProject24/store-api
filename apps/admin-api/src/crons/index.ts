import {dailyCron} from './stats/daily.cron'
import {monthlyCron} from './stats/montly.cron'
import {yearlyCron} from './stats/yearly.cron'

export const initCrons = () => {
    dailyCron()
    monthlyCron()
    yearlyCron()
}