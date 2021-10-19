import { createAPI } from './http'

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
  api: ReturnType<typeof createAPI>

  constructor(config: BotConfig) {
    this.mirai = config
    this.qq = config.qq

    this.api = createAPI(config)
  }

  async start(cb: () => any = () => {}) {
    await this.link()

    cb()

    this.listen()

    process.on('exit', () => {
      this.api.release()
    })
  }

  async link() {
    await this.api.verify()

    console.log(await this.api.bind())
  }

  on() {}

  listen() {
    setInterval(async () => {
      console.log(await this.api.fetchMessage())
    }, 3000)
  }
}
