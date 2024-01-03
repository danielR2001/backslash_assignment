import express from 'express'

import graphRoutes from './graph.routes'

const router = express.Router()

router.use(graphRoutes)

export default router
