import { Bot } from '.'
import {
  Message,
  MessageChain,
  ReceiveMessageChain,
  MessageType,
  SourceMessage
} from '../types'

export const createContext = (message: Message, bot: Bot) => {
  return new Context(message, bot)
}

export class Context {
  bot: Bot
  private message: Message

  messageSource: SourceMessage | undefined
  messageType: MessageType
  messageChain: MessageChain
  from: number
  group: number = 0

  constructor(message: Message, bot: Bot) {
    this.bot = bot
    this.message = message

    this.messageType = message.type
    this.messageChain = this.messageResolver(message.messageChain)

    this.from = message.sender.id
    if (message.type === 'GroupMessage') {
      this.group = message.sender.group.id
    }
  }

  messageResolver(messageChain: ReceiveMessageChain) {
    const [sourceMessage, ...contentMessageChain] = messageChain
    this.messageSource = sourceMessage
    return contentMessageChain
  }

  async reply(messageChain: MessageChain) {
    if (this.messageType === 'FriendMessage') {
      await this.bot.api.sendFriendMessage(this.from, messageChain)
    } else if (this.messageType === 'GroupMessage') {
      await this.bot.api.sendGroupMessage(this.group, messageChain)
    }
  }
}
