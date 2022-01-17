import { Bot } from '../../bot'
import { generate } from './generator'

/**
 * ## Plugin: JJZ
 * - The bot generate a JueJueZi-like paragraph
 * - Based on the script from [JueJueZiGenerator](https://github.com/kingcos/JueJueZiGenerator)
 *
 * @param bot Bot instance
 */

export default (bot: Bot) => {
  bot.command('jjz', (ctx) => {
    if (ctx.command?.arguments?.length! < 2) {
      ctx.reply(`Command [jjz]
Usage: /jjz <verb> <noun>`)
    } else {
      ctx.reply(
        generate(`${ctx.command?.arguments![0]} ${ctx.command?.arguments![1]}`)
      )
    }
  })

  return 'JJZ'
}
