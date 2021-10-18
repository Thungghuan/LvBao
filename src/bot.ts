import Mirai, { MiraiApiHttpSetting, EventType, MessageType } from 'mirai-ts'

export type BotSetting = MiraiApiHttpSetting

export interface BotConfig {
  qq: number
  setting: MiraiApiHttpSetting
}

declare type ChatContext<
  T extends 'message' | EventType.EventType | MessageType.ChatMessageType
> = T extends EventType.EventType
  ? EventType.EventMap[T]
  : T extends MessageType.ChatMessageType
  ? MessageType.ChatMessageMap[T]
  : MessageType.ChatMessage

export const createBot = (config: BotConfig) => {
  return new Bot(config)
}

class Bot {
  mirai: Mirai
  qq: number

  constructor(config: BotConfig) {
    this.mirai = new Mirai(config.setting)
    this.qq = config.qq
  }

  async start() {
    await this.link()

    this.listen()

    process.on('exit', () => {
      this.mirai.release()
    })
  }

  async link() {
    await this.mirai.link(this.qq)
  }

  on<T extends 'message' | EventType.EventType | MessageType.ChatMessageType>(
    type: T,
    cb: (ctx: ChatContext<T>) => any
  ): void {
    this.mirai.on(type, cb)
  }

  listen() {
    this.mirai.listen()
  }
}
