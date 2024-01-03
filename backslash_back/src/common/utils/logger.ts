import chalk from 'chalk'

import { Level } from '@my-types/common'

import { Environment } from './constants'

const env = process.env.NODE_ENV

const logger = (level: Level, title: string, message: string, error?: Error): void => {
  switch (level) {
    case Level.Error:
      console.error(`${chalk.red('[ERROR]')} [${title}] ${message} [ERROR]: ${error?.toString()}`)
      break
    case Level.Warn:
      console.warn(`${chalk.yellow('[WARNING]')} [${title}] ${message}`)
      break
    case Level.Debug:
      if (env === Environment.DEVELOPMENT || env === Environment.TEST) {
        console.debug(`[DEBUG] [${title}] ${message}`)
      }
      break
    case Level.Info:
    default:
      console.info(`${chalk.magenta('[INFO]')} ${chalk.blue(`[${title}]`)} ${message}`)
      break
  }
}

const separator = chalk.magenta('|')

export { logger, Level, separator }
