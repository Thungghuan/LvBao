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
  console.log(
    `From: ${ctx.sender.nickname}(${ctx.sender.id}): ${ctx.messageChain[1].text}`
  )

  bot.send(ctx.sender.id, ctx.messageChain)

  console.log(
    `To: ${ctx.sender.nickname}(${ctx.sender.id}): ${ctx.messageChain[1].text}`
  )
})

bot.start()
