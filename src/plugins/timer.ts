import { Bot } from '../bot'
import config from '../../config'
import schedule from './schedule'

/**
 * ## Plugin: Timer
 * - Alert the owner(master) of bot the time every hour
 * - Based on the schedule plugin
 * 
 * @param bot Bot instance
 */

export default (bot: Bot) => {
  const timerCron = '0 * * * *'

  schedule(bot, timerCron, (bot: Bot) => {
    return async () =>
      await bot.send(
        config.masterQQ,
        `It's ${new Date().getHours()} o'clock now.`
      )
  })

  return 'Timer'
}
