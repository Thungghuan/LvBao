import { Context } from "../src/context"

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

export type MessageType = 'message' | 'FriendMessage' | 'GroupMessage'

export type SingleMessage = any
export type MessageChain = SingleMessage[]

export interface Message {
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
  handler(ctx: Context): any
}
