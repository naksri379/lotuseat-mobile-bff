import * as Joi from 'joi'
import { IS_REQUIRED, IS_NOT_A_NUMBER, IS_NOT_A_STRING } from 'src/constants/joiSchemaConstant'

export const GET_CATEGORY_LIST_REQUEST_SCHEMA = Joi.object({
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

export const CREATE_CATEGORY_REQUEST_SCHEMA = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_STRING}`,
    }),
  en: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_STRING}`,
    }),
  th: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_STRING}`,
    }),
  status: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_STRING}`,
  }),
  group: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'number.base': `{#key} ${IS_NOT_A_STRING}`,
  })
}).unknown(true)
