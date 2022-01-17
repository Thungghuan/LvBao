import { Bot } from '../bot'

/**
 * [Default Plugin]
 * ## Plugin: Rand
 * - The bot give you a random answer from the choices you provide
 *
 * @param bot Bot instance
 */

export default (bot: Bot) => {
  bot.command('rand', (ctx) => {
    if (ctx.command?.arguments?.length === 0) {
      ctx.reply(`Command [rand]
Usage: /rand <choice...>`)
    } else {
      const choiceNumber = ctx.command?.arguments?.length!

      ctx.reply(
        ctx.command!.arguments![Math.floor(Math.random() * choiceNumber)]
      )
    }
  })

  return 'Rand'
}
