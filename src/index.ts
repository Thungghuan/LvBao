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
    await this.link()

    cb()

    this.listen()

    process.on('exit', () => {
      this.api.release()
    })
  }

  async link() {
    await this.api.verify()
    await this.api.bind()
  }

  on(type: 'message' | MessageType, handler: (ctx: Context) => any) {
    this.eventListeners.push({
      eventName: type,
      handler
    })
  }

  async send(target: number, messageChain: MessageChain) {
    await this.api.sendFriendMessage(target, messageChain)
  }

  handler(ctx: Context) {
    this.eventListeners
      .filter(
        (listener) =>
          listener.eventName === ctx.messageType ||
          listener.eventName === 'message'
      )
      .map((listener) => listener.handler)
      .forEach((handler) => handler(ctx))
  }

  listen() {
    setInterval(async () => {
      const { data } = await this.api.fetchMessage()

      data.forEach((mes) => {
        this.handler(createContext(mes, this))
      })
    }, 300)
  }
}
