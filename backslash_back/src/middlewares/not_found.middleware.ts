import { Request, Response } from 'express'

import { ErrorMessage, failureResponse } from '@utils/responses'

export const notFoundMiddleware = (_: Request, res: Response) => {
  return res.status(404).json(failureResponse(ErrorMessage.NOT_FOUND_ERROR))
}
