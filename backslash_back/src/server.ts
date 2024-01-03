// sort-imports-ignore
import { config } from 'dotenv'
config()

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import 'module-alias/register'
import 'reflect-metadata'

import { apiLogger, errorHandler, generalMiddleware, notFoundMiddleware } from '@middlewares/index'
import appRoutes from '@routes/index'
import { EnvironmentVariables } from '@utils/constants'
import { Level, logger } from '@utils/logger'
import { InternalError } from '@my-types/common'

//********************************* ENV VARIABLES CHECK ********************************

const unsetEnv = Object.values(EnvironmentVariables).filter((env) => !(typeof process.env[env] !== 'undefined'))
if (unsetEnv.length > 0) {
  throw new InternalError('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']')
}

const NODE_ENV: string = process.env.NODE_ENV!
const PORT: string = process.env.PORT!

//********************************* INIT EXPRESS SERVER ********************************

const app = express()
const server = createServer(app)

//************************************ CONFIGURATIONS **********************************

app.enable('trust proxy')

//************************************* MIDDLEWARES ************************************

app.use(cors({ exposedHeaders: ['x-version'] }))
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(apiLogger)
app.use(generalMiddleware)

//*************************************** ROUTES ***************************************

app.use('/', appRoutes)

//************************************* 404 HANDLER ************************************

app.use(notFoundMiddleware)

//************************************ ERROR HANDLER ***********************************

app.use(errorHandler)

//******************************** INIT DB & START SERVER ******************************

server.listen(PORT, () => {
  logger(Level.Info, 'SERVER', `server is alive in ${NODE_ENV} mode on port ${PORT}`)
})
