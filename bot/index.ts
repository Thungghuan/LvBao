import { createBot } from '../src'
import { BotSetting, BotConfig } from '../types'
import config from '../config'
import { loadSetting } from '../utils'
import timer from '../src/plugins/timer'

const { qq, settingFile } = config

// disable proxy for axios
process.env.http_proxy = ''

const botConfig: BotConfig = {
  qq,
  setting: loadSetting(settingFile) as BotSetting
}

const bot = createBot(botConfig)

bot.on('message', async (ctx) => {
  console.log(ctx.messageChain)
})

// bot.command('*', async (ctx) => {
//   // console.log(ctx.command)
//   await ctx.replyPlainMessage(`Command [${ctx.command?.name}] got!
// command name: ${ctx.command?.name}
// command arguments: ${JSON.stringify(ctx.command?.arguments)}`)
// })

bot.use(timer)

bot.start()
