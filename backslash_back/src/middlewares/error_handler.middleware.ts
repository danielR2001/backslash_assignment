import { NextFunction, Request, Response } from 'express'

import { BadRequestError, UnauthorizedError } from '@my-types/common'
import { Level } from '@my-types/common'
import { logger } from '@utils/logger'
import { ErrorMessage, failureResponse } from '@utils/responses'

export const errorHandler = (error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error.constructor.name === 'UnauthorizedError') {
    const unauthorizedError = error as UnauthorizedError

    return res.status(unauthorizedError.code).json(failureResponse(error.message as ErrorMessage))
  } else if (error.constructor.name === 'BadRequestError') {
    const badRequestError = error as BadRequestError

    return res
      .status(badRequestError.code)
      .json(failureResponse(badRequestError.message as ErrorMessage, badRequestError.invalidParams))
  }

  logger(Level.Info, 'ERROR', `message: ${error.message}, stack: ${error.stack}`)
  return res.status(500).json(failureResponse(ErrorMessage.INTERNAL_ERROR))
}
