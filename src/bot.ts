export type BotSetting = {}
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

  constructor(config: BotConfig) {
    this.mirai = config
    this.qq = config.qq
  }

  async start(cb: () => any = () => {}) {
    this.link()

    cb()

    this.listen()
  }

  link() {}

  on() {}

  listen() {}
}
