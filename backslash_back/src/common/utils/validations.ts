import Joi from 'joi'

export const validationSchemas = {
  getGraph: Joi.object().keys({
    filterBy: Joi.string()
  })
}
