import { BotConfig, BotSetting, Message, MessageChain } from '../../types'
import { createAxios } from './axios'

export const createAPI = (config: BotConfig) => {
  return new HttpApi(config)
}

class HttpApi {
  qq: number
  botSetting: BotSetting

  axios: ReturnType<typeof createAxios>
  verifyKey: string
  sessionKey = ''

  constructor(config: BotConfig) {
    this.qq = config.qq
    this.botSetting = config.setting
    this.verifyKey = config.setting.verifyKey

    const { host, port } = this.botSetting.adapterSettings.http

    this.axios = createAxios({
      baseURL: `http://${host}:${port || 80}`,
      proxy: false
    })
  }

  async verify() {
    const { data } = await this.axios.post<{
      code: number
      session: string
    }>('/verify', {
      verifyKey: this.verifyKey
    })
    this.sessionKey = data.session
    return data
  }

  async bind() {
    const { data } = await this.axios.post<{
      code: number
      msg: string
    }>('/bind', {
      sessionKey: this.sessionKey,
      qq: this.qq
    })
    return data
  }

  async release() {
    const { data } = await this.axios.post<{
      code: Number
      msg: string
    }>('/release', {
      sessionKey: this.sessionKey,
      qq: this.qq
    })
    return data
  }

  async countMessage() {
    const { data } = await this.axios.get<{
      code: number
      msg: string
      data: number
    }>(`/countMessage?sessionKey=${this.sessionKey}`)
    return data
  }

  async fetchMessage(count: number = 10) {
    const { data } = await this.axios.get<{
      code: number
      msg: string
      data: Message[]
    }>(`/fetchMessage?sessionKey=${this.sessionKey}&count=${count}`)
    return data
  }

  async sendFriendMessage(target: number, messageChain: MessageChain) {
    const { data } = await this.axios.post('/sendFriendMessage', {
      sessionKey: this.sessionKey,
      target,
      messageChain
    })
    return data
  }
}
