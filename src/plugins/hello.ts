import { Bot } from '..'

/**
 * [Default Plugin]
 * Plugin: Hello
 * - Reply hello message when received hello command
 *
 * @param bot: Bot instance
 */

export default (bot: Bot) => {
  bot.command('hello', (ctx) => {
    ctx.replyPlainMessage(`Hello I'm LvBao.
A QQ bot written by Thungghuan.`)
  })

  bot.command('你好', (ctx) => {
    ctx.replyPlainMessage(`你好，我是绿宝。
是Thungghuan写的一个QQ机器人。`)
  })

  return 'Hello'
}
