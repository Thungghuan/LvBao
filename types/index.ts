import { Context } from '../src/context'
import { MessageType } from './message'

export * from './message'
export * from './user'

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

export interface EventListener {
  eventName: 'message' | MessageType | string
  handler(ctx: Context): any
}
