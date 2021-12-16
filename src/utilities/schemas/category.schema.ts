import * as Joi from 'joi'
import { IS_REQUIRED, IS_NOT_A_NUMBER, MUST_NOT_BE_EMPTY } from 'src/constants/joiSchemaConstant'

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

export const DELETE_CATEGORY_BY_ID_REQUEST_SCHEMA = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
    }),
}).unknown(true)

export const UPDATE_CATEGORY_REQUEST_SCHEMA = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'string.base': `{#key} ${MUST_NOT_BE_EMPTY}`,
    }),
  nameEn: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'string.base': `{#key} ${MUST_NOT_BE_EMPTY}`,
    }),
  nameTh: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'string.base': `{#key} ${MUST_NOT_BE_EMPTY}`,
    }),
  status: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'string.base': `{#key} ${MUST_NOT_BE_EMPTY}`,
    }),
  group: Joi.string()
    .required()
    .messages({
      'any.required': `{#key} ${IS_REQUIRED}`,
      'string.base': `{#key} ${MUST_NOT_BE_EMPTY}`,
    }),
}).unknown(true)
