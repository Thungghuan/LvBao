import { Bot } from '.'
import {
  Message,
  MessageChain,
  ReceiveMessageChain,
  MessageType,
  SourceMessage,
  SingleMessage
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

    this.commandResolver(contentMessageChain)

    return contentMessageChain
  }

  /**
   * What type of messages will treated as a command?
   *
   * 1. A friend message which first content message element in the
   *    message chain is a palin text begins with a slash ('/').
   * 2. A group message which first content message element is
   *    '@[bot-name]' and the second is a plain text begins with a
   *    slash ('/').
   */
  private commandResolver(contentMessageChain: MessageChain) {
    let commandMessage: SingleMessage[] = contentMessageChain

    if (
      this.messageType === 'GroupMessage' &&
      contentMessageChain[0].type === 'At' &&
      contentMessageChain[0].target === this.bot.qq
    ) {
      commandMessage = contentMessageChain.slice(1)
    }

    if (
      commandMessage[0] &&
      commandMessage[0].type === 'Plain' &&
      /\/(.+)/.test(commandMessage[0].text)
    ) {
      this.isCommand = true
      this.command = {
        name: `command:${/\/(.+)/.exec(commandMessage[0].text)![1]}`,
        arguments: []
      }
    }
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
