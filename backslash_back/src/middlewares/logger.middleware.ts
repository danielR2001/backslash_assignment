import chalk from 'chalk'
import morgan from 'morgan'

import { separator } from '@utils/logger'

export const apiLogger = morgan(function (tokens, req, res) {
  return [
    chalk.magenta('[INFO]'),
    chalk.blue('[API]'),
    tokens['remote-addr'](req, res),
    separator,
    httpMethodColor(tokens.method(req, res) ?? ''),
    separator,
    tokens.url(req, res),
    separator,
    httpStatusColor(tokens.status(req, res) ?? ''),
    '-',
    responseTimeColor(tokens['response-time'](req, res) ?? ''),
    'ms',
    '-'
  ].join(' ')
})

const httpMethodColor = (method: string): string => {
  switch (method) {
    case 'POST':
      return chalk.yellow(method)
    case 'PUT':
      return chalk.blue(method)
    case 'DELETE':
      return chalk.red(method)
    case 'GET':
    default:
      return chalk.green(method)
  }
}

const httpStatusColor = (status: string): string => {
  if (status.startsWith('2')) {
    return chalk.greenBright(status)
  }
  if (status.startsWith('3') || status.startsWith('4')) {
    return chalk.yellowBright(status)
  }
  return chalk.redBright(status)
}

const responseTimeColor = (responseTime: string): string => {
  if (!isNaN(Number(responseTime)) && parseInt(responseTime) > 500) {
    return chalk.redBright(responseTime)
  }
  return responseTime
}
