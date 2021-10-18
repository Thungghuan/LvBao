import Mirai, { MiraiApiHttpSetting } from 'mirai-ts'
import config from './config'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const { qq, settingFile } = config

// disable proxy for axios
process.env.http_proxy = ''

const setting = yaml.load(
  fs.readFileSync(path.resolve(__dirname, settingFile), 'utf8')
) as MiraiApiHttpSetting

const mirai = new Mirai(setting)

const app = async () => {
  await mirai.link(qq)
  mirai.on('message', (msg) => {
    console.log(msg)
    msg.reply(msg.messageChain)
  })
  mirai.listen()
}

app()
