import { Context } from '../src/context'
import { MessageType } from './message'

export * from './message'

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
  eventName: 'message' | MessageType
  handler(ctx: Context): any
}
