import { BotConfig, BotSetting } from '..'
import { createAxios, Axios } from './axios'

export const createAPI = (config: BotConfig) => {
  return new API(config)
}

export default class API {
  qq: number
  botSetting: BotSetting

  axios: Axios
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
}
