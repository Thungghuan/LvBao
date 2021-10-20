import { BasicMessage } from '../types'

export const createContext = (message: BasicMessage) => {
  return new Context(message)
}

export class Context {
  message: BasicMessage

  constructor(message: BasicMessage) {
    this.message = message
  }
}
