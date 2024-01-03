import { rateLimit } from 'express-rate-limit'

//  TODO implement rate limit
export const loginRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: true,
  skipSuccessfulRequests: true
})
