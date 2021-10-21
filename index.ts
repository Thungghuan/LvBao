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

bot.on('FriendMessage', (ctx) => {
  ctx.reply(ctx.messageChain)
})

bot.start()
