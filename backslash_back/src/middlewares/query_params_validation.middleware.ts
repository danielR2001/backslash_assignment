import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { BadRequestError } from '@my-types/common'
import { Level } from '@my-types/common'
import { logger } from '@utils/logger'
import { InvalidParamsMessage } from '@utils/responses'

export const queryParamsValidation = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, { errors: { label: 'key', wrap: { label: false } } })
    const valid = error === undefined

    if (valid) {
      next()
      return
    }
    const { details } = error

    let invalidParamsMessage: Record<string, InvalidParamsMessage | string> = {}
    details.map((detailsItem) => {
      if (detailsItem.context?.details) {
        invalidParamsMessage = Object.fromEntries(
          detailsItem.context?.details?.map((contextItem: any) =>
            contextItem.message !== '' ? [contextItem.context.key ?? '', contextItem.message] : []
          )
        )
      } else {
        invalidParamsMessage = { [detailsItem.context?.key ?? '']: detailsItem.message }
      }
    })

    logger(Level.Debug, 'DEBUG', `query validation failed. details: ${JSON.stringify(details)}`)

    next(new BadRequestError(InvalidParamsMessage.INVALID_QUERY_PARAMS, invalidParamsMessage))
  }
}
