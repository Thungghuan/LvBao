import { Bot } from './bot'
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
  messageType: MessageType
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
   * A friend message or a group message which first content
   * message element in the message chain is a palin text
   * begins with a slash ('/').
   *
   */
  private commandResolver(contentMessageChain: MessageChain) {
    let commandMessage: SingleMessage[] = contentMessageChain

    if (
      commandMessage[0] &&
      commandMessage[0].type === 'Plain' &&
      /^\s*\/(.+)/.test(commandMessage[0].text)
    ) {
      this.isCommand = true
      let [commandName, ...commandArgs] = commandMessage[0].text
        .trim()
        .split(' ')
        .filter((el) => !!el)

      if (commandMessage.length > 1) {
        commandMessage.shift()

        commandMessage.forEach((message) => {
          if (message.type === 'Plain') {
            commandArgs = [
              ...commandArgs,
              ...message.text
                .trim()
                .split(' ')
                .filter((el) => !!el)
            ]
          }
        })
      }

      this.command = {
        name: /^\s*\/(.+)/.exec(commandName)![1],
        arguments: commandArgs
      }
    }
  }

  async reply(message: string | MessageChain) {
    if (typeof message === 'string') {
      message = [
        {
          type: 'Plain',
          text: message
        }
      ]
    }

    if (this.messageType === 'FriendMessage') {
      await this.bot.api.sendFriendMessage(this.from, message)
    } else if (this.messageType === 'GroupMessage') {
      await this.bot.api.sendGroupMessage(this.group, message)
    }
  }
}
