import express from 'express'

import { getGraph } from '@controllers/index'
import { queryParamsValidation } from '@middlewares/index'
import { validationSchemas } from '@utils/validations'

const router = express.Router()
router.get('/graph', queryParamsValidation(validationSchemas.getGraph), getGraph)

export default router
