import API, { createAPI } from './api'

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

export const createBot = (config: BotConfig) => {
  return new Bot(config)
}

class Bot {
  mirai: {}
  qq: number
  api: API

  constructor(config: BotConfig) {
    this.mirai = config
    this.qq = config.qq

    this.api = createAPI(config)
  }

  async start(cb: () => any = () => {}) {
    await this.link()

    cb()

    this.listen()
  }

  async link() {
    this.api.verify()

  }

  on() {}

  listen() {}
}
