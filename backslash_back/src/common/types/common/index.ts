import { InvalidParamsMessage } from '@utils/responses'

// eslint-disable-next-line functional/no-classes
export class UnauthorizedError extends Error {
  public code: number
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = 401
  }
}

// eslint-disable-next-line functional/no-classes
export class BadRequestError extends Error {
  public code: number
  public invalidParams?: Record<string, InvalidParamsMessage | string>

  constructor(message: string, invalidParams?: Record<string, InvalidParamsMessage | string>) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = 400
    this.invalidParams = invalidParams
  }
}

// eslint-disable-next-line functional/no-classes
export class InternalError extends Error {
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
  }
}

export enum Level {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Debug = 'DEBUG'
}

export enum FilterBy {
  IsPubliclyExposed = 'IS_PUBLICLY_EXPOSED',
  SinkRoutes = 'SINK_ROUTES',
  HasVulnerability = 'HAS_VULNERABILITY'
}
