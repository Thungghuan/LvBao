import { Bot } from '../bot'
import axios from 'axios'

/**
 * ## Plugin: Nbnhhsh
 * - The bot translate the pinyin abbr to Chinese
 * - Based on the api from [nbnhhsh](https://github.com/itorr/nbnhhsh)
 *
 * @param bot Bot instance
 */

export default (bot: Bot) => {
  bot.command('nbnhhsh', async (ctx) => {
    if (ctx.command?.arguments?.length === 0) {
      ctx.replyPlainMessage(`Command [nbnhhsh]
Usage: /nbnhhsh <text>`)
    } else {
      ctx.replyPlainMessage('翻译中，请稍候……')
      const text = ctx.command?.arguments?.join(',')

      try {
        const { data } = await axios.post<
          {
            name: string
            trans?: string[]
          }[]
        >(
          'https://lab.magiconch.com/api/nbnhhsh/guess',
          {
            text
          },
          {
            proxy: false
          }
        )

        const message = data
          .map((res) => {
            let mes = ''
            mes += res.name + '：\n'

            if (!res.trans) {
              mes += '翻译不了嘤嘤嘤'
            } else {
              mes += res.trans.join(' ')
            }

            return mes
          })
          .join('\n')

        ctx.replyPlainMessage(message)
      } catch {
        ctx.replyPlainMessage('翻译失败')
      }
    }
  })

  return 'Nbnhhsh'
}
