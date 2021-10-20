import { Message } from '../types'

export const createContext = (message: Message) => {
  return new Context(message)
}

export class Context {
  message: Message

  constructor(message: Message) {
    this.message = message
  }
}
