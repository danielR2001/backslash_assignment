/* eslint-disable @typescript-eslint/naming-convention */
import { User as MyUser, Token } from '@db/entities'

export {}

declare global {
  namespace Express {
    interface Locals {
      token?: Token
      user?: MyUser
    }
    interface Response {
      locals: undefined
    }
    interface Request {
      locals: Locals
    }
  }
}
