import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf } = format

export default createLogger({
  level: 'info',
  format: combine(
    label({ label: 'LvBao' }),
    timestamp(),
    printf(
      ({ level, message, label, timestamp }) =>
        `[${label}] ${timestamp} ${level} ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
})
