import { createAPI } from './http'
import {
  BotConfig,
  MessageType,
  Context,
  EventListener,
  MessageChain
} from '../types'

export const createBot = (config: BotConfig) => {
  return new Bot(config)
}

class Bot {
  mirai: {}
  qq: number

  api: ReturnType<typeof createAPI>
  eventListeners: EventListener[]

  constructor(config: BotConfig) {
    this.mirai = config
    this.qq = config.qq

    this.api = createAPI(config)
    this.eventListeners = []
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

  on(type: MessageType, cb: (ctx: Context) => any) {
    this.eventListeners.push({
      eventName: type,
      handler: cb
    })
  }

  async send(target: number, messageChain: MessageChain) {
    await this.api.sendFriendMessage(target, messageChain)
  }

  handler(ctx: Context) {
    this.eventListeners
      .filter((listener) => listener.eventName === ctx.type)
      .map((listener) => listener.handler)
      .forEach((handler) => handler(ctx))
  }

  listen() {
    setInterval(async () => {
      const { data } = await this.api.fetchMessage()

      data.forEach((ctx) => {
        this.handler(ctx)
      })
    }, 300)
  }
}
