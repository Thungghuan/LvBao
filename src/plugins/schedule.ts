import cron from 'node-cron'
import { Bot } from '..'

/**
 * Plugin: Schedule
 * - Do the job according to the schedule you set
 * - Using module [node-cron](https://github.com/node-cron/node-cron)
 *
 * @param bot: Bot instance
 * @param schedule: cron schedule string
 * @param handler: cron job
 */

export default (
  bot: Bot,
  schedule: string,
  handler: (bot: Bot) => () => void
) => {
  cron.schedule(schedule, handler(bot))

  return 'Schedule'
}
