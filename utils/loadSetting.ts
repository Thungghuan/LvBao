import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export const loadSetting = (filePath: string) => {
  return yaml.load(
    fs.readFileSync(path.resolve(__dirname, '../' + filePath), 'utf8')
  )
}
