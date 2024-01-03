import { NextFunction, Request, Response } from 'express'
import { camelizeKeys } from 'humps'

export const generalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.locals = {}
  req.body = camelizeKeys(req.body)
  next()
}
