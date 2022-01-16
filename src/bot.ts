import { createAPI } from './http'
import { BotConfig, MessageType, EventListener, MessageChain } from '../types'
import { createContext, Context } from './context'
import logger from './logger'

export const createBot = (config: BotConfig) => {
  return new Bot(config)
}
export class Bot {
  mirai: {}
  qq: number

  api: ReturnType<typeof createAPI>
  eventListeners: EventListener[]

  constructor(config: BotConfig) {
    this.mirai = config
    this.qq = config.qq

    this.api = createAPI(config)
    this.eventListeners = []

    logger.log('info', 'Bot started.')
  }

  async start(cb: () => any = () => {}) {
    await this.api.verify()
    await this.api.bind()

    cb()

    this.listen()

    process.on('exit', () => {
      this.api.release()
    })
  }

  on(type: 'message' | MessageType, handler: (ctx: Context) => any) {
    this.eventListeners.push({
      eventName: type,
      handler
    })
  }

  command(command: string, handler: (ctx: Context) => any) {
    this.eventListeners.push({
      eventName: `command:${command}`,
      handler
    })
  }

  async send(target: number, messageChain: MessageChain) {
    await this.api.sendFriendMessage(target, messageChain)
  }

  async handler(ctx: Context) {
    logger.log('info', `Handle message source ${ctx.messageSource!.id}`)
    const eventHandlers = this.eventListeners.filter((listener) => {
      if (ctx.isCommand) {
        return listener.eventName === ctx.command!.name
      } else {
        return (
          listener.eventName === ctx.messageType ||
          listener.eventName === 'message'
        )
      }
    })

    if (eventHandlers.length === 0) {
      // handler for unknown command
      if (ctx.isCommand) {
        const commandName = ctx.command?.name.split(':')[1]
        await ctx.replyPlainMessage(`Unknown command: [${commandName}]`)
      }
    } else {
      eventHandlers.map((listener) => listener.handler(ctx))
    }
  }

  private listen() {
    setInterval(async () => {
      const { data } = await this.api.fetchMessage()

      data.forEach(async (mes) => {
        await this.handler(createContext(mes, this))
      })
    }, 300)
  }
}
