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

  async start(cb: () => any = () => {}) {
    await this.link()

    cb()

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

  async getFriendList() {
    return await this.mirai.api.friendList()
  }

  async getGroupList() {
    return await this.mirai.api.groupList()
  }

  async getMemberList(target: number) {
    return await this.mirai.api.memberList(target)
  }

  async sendFriend(
    messageChain: string | MessageType.MessageChain,
    target: number,
    quote?: number
  ) {
    this.mirai.api.sendFriendMessage(messageChain, target, quote)
  }

  async sendGroup(
    messageChain: string | MessageType.MessageChain,
    target: number,
    quote?: number
  ) {
    this.mirai.api.sendGroupMessage(messageChain, target, quote)
  }

  async sendNudge(
    target: number,
    subject: number,
    kind?: 'Friend' | 'Group' | 'Stranger'
  ) {
    this.mirai.api.sendNudge(target, subject, kind)
  }

  async mute(target: number, memberId: number, time?: number) {
    await this.mirai.api.mute(target, memberId, time)
  }

  async unmute(target: number, memberId: number) {
    await this.mirai.api.unmute(target, memberId)
  }

  async muteAll(target: number) {
    await this.mirai.api.muteAll(target)
  }

  async unmuteAll(target: number) {
    await this.mirai.api.unmuteAll(target)
  }

  listen() {
    this.mirai.listen()
  }
}
