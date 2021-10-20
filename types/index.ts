export type BotSetting = {
  verifyKey: string
  adapterSettings: {
    http: {
      host: string
      port?: number
    }
  }
}

export type BotConfig = {
  setting: BotSetting
  qq: number
}

export type MessageType = 'message' | 'FriendMessage'

export type SingleMessage = any
export type MessageChain = SingleMessage[]
export interface Context {
  type: MessageType
  messageChain: MessageChain
  sender: {
    id: number
    nickname: string
    remark: string
  }
}

export interface EventListener {
  eventName: MessageType
  handler(ctx: any): any
}
