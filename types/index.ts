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

export interface Context {
  type: MessageType
  messageChain: any[]
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
