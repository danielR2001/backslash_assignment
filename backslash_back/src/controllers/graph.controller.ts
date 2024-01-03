import { NextFunction, Request, Response } from 'express'

import { graphModel } from '@models/index'
import { BadRequestError, FilterBy } from '@my-types/common'
import { GetGraphQuery } from '@my-types/request'
import { InvalidParamsMessage, successResponse } from '@utils/responses'

export const getGraph = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const { filterBy } = req.query as GetGraphQuery

    let parsedFilterBy: FilterBy[] = []

    if (filterBy) {
      try {
        parsedFilterBy = JSON.parse(filterBy)
        if (
          !parsedFilterBy ||
          !Array.isArray(parsedFilterBy) ||
          !parsedFilterBy.every((item) => typeof item === 'string')
        ) {
          throw new Error()
        }
      } catch (err) {
        throw new BadRequestError(InvalidParamsMessage.INVALID_PARAMS)
      }
    }
    const result = graphModel.getGraph(parsedFilterBy)

    return res.status(200).json(successResponse(result))
  } catch (err: unknown) {
    return next(err)
  }
}
