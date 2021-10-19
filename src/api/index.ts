import { BotConfig, BotSetting } from '..'
import axios from './axios'

export const createAPI = (config: BotConfig) => {
  return new API(config)
}

export default class API {
  qq: number
  botSetting: BotSetting
  baseURL: string
  verifyKey: string
  sessionKey = ''

  constructor(config: BotConfig) {
    this.qq = config.qq
    this.botSetting = config.setting
    this.verifyKey = config.setting.verifyKey

    const { host, port } = this.botSetting.adapterSettings.http

    this.baseURL = `http://${host}:${port || 80}`
  }

  verify() {
    axios
      .post<{
        code: number
        session: string
      }>(this.baseURL + '/verify', {
        verifyKey: this.verifyKey
      })
      .then((res) => {
        console.log(res.data)
        this.sessionKey = res.data.session
        this.bind()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  bind() {
    axios
      .post(this.baseURL + '/bind', {
        sessionKey: this.sessionKey,
        qq: this.qq
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
