import { Bot } from '.'
import { Message, MessageChain, MessageType } from '../types'

export const createContext = (message: Message, bot: Bot) => {
  return new Context(message, bot)
}

export class Context {
  bot: Bot
  message: Message

  messageType: MessageType
  messageChain: MessageChain
  from: number
  group: number = 0

  constructor(message: Message, bot: Bot) {
    this.bot = bot
    this.message = message

    this.messageType = message.type
    this.messageChain = message.messageChain

    this.from = message.sender.id
    if (message.type === 'GroupMessage') {
      this.group = message.sender.group.id
    }
  }

  async reply(message: MessageChain) {
    if (this.messageType === 'FriendMessage') {
      await this.bot.api.sendFriendMessage(this.from, message)
    }
  }
}
