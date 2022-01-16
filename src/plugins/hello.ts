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
A QQ bot written by Thungghuan.
See also at https://github.com/Thungghuan/LvBao.
And give me a ⭐️.`)
  })

  bot.command('你好', (ctx) => {
    ctx.replyPlainMessage(`你好，我是绿宝。
是Thungghuan写的一个QQ机器人。
到 https://github.com/Thungghuan/LvBao 来了解更多。
顺便给个星星🤤。`)
  })

  return 'Hello'
}
