import { createBot } from './src'
import { BotSetting, BotConfig } from './types'
import config from './config'
import { loadSetting } from './utils'

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
  // await ctx.reply(ctx.messageChain)
  await ctx.replyPlainMessage('Not a command')
})

bot.command('test', async (ctx) => {
  await ctx.replyPlainMessage('Command [test] got!')
})

bot.start()
