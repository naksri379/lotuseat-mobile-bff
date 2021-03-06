import * as Joi from 'joi'
import { IS_REQUIRED, IS_NOT_A_NUMBER } from 'src/constants/joiSchemaConstant'

export const GET_PRODUCT_LIST_REQUEST_SCHEMA = Joi.object({
  offset: Joi.number()
    .required()
    .min(0)
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_NUMBER}`,
      'number.min': '{#key} must over {#limit}',
    }),
  limit: Joi.number()
    .required()
    .min(1)
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_NUMBER}`,
      'number.min': '{#key} must over {#limit}',
    }),
}).unknown(true)
