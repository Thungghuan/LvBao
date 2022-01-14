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

type Command = null | {
  name: string
  arguments?: string[]
}

export class Context {
  bot: Bot
  private message: Message

  messageSource: SourceMessage | undefined
  messageType: MessageType | string
  messageChain: MessageChain
  isCommand: boolean = false
  command: Command = null
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

  private messageResolver(messageChain: ReceiveMessageChain) {
    const [sourceMessage, ...contentMessageChain] = messageChain
    this.messageSource = sourceMessage

    /**
     * What type of messages will treated as a command?
     *
     * 1. A friend message which first content message element in the
     *    message chain is a palin text begins with a slash ('/').
     * 2. A group message which first content message element is
     *    '@[bot-name]' and the second is a plain text begins with a
     *    slash ('/').
     */

    if (this.messageType === 'FriendMessage') {
      const firstMessage = contentMessageChain[0]

      if (firstMessage.type === 'Plain' && /\/(.+)/.test(firstMessage.text)) {
        this.isCommand = true
        this.command = {
          name: `command:${/\/(.+)/.exec(firstMessage.text)![1]}`,
          arguments: []
        }
      }
    }

    return contentMessageChain
  }

  async reply(messageChain: MessageChain) {
    if (this.messageType === 'FriendMessage') {
      await this.bot.api.sendFriendMessage(this.from, messageChain)
    } else if (this.messageType === 'GroupMessage') {
      await this.bot.api.sendGroupMessage(this.group, messageChain)
    }
  }

  async replyPlainMessage(message: string) {
    await this.reply([
      {
        type: 'Plain',
        text: message
      }
    ])
  }
}
