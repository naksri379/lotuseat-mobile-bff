import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger'
import {
  ResponseSuccess200,
  ResponseSuccess201,
} from '../../domains/responseSuccess.dto'
import {
  ResponseError400InvalidParam,
  ResponseError401InvalidKey,
  ResponseError403Forbidden,
  ResponseError404NotFound,
  ResponseError405ModthodNotAllowed,
  ResponseError406NotAcceptable,
  ResponseError415UnSupported,
  ResponseError500InternalServerError,
} from 'src/domains/responseError.dto'
import { ErrorStatus } from 'src/enums/httpStatus.enum'
let apiDecorators = []
export function ApiDefaultErrorResponse(...status: number[]) {
  apiDecorators = []
  if (!status.length) {
    status = [400, 401, 403, 404, 405, 406, 415, 500]
  }
  if (status.includes(400)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.INVALID_PARAMS,
        description: 'Invalid Params.',
        type: ResponseError400InvalidParam,
      })
    )
  }
  if (status.includes(401)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.INVALID_KEY,
        description: 'Invalid Key or Unauthorized',
        type: ResponseError401InvalidKey,
      })
    )
  }
  if (status.includes(403)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.FORBIDDEN,
        description:
          'Forbidden. Client does not have permission to perform the request',
        type: ResponseError403Forbidden,
      })
    )
  }
  if (status.includes(404)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.NOT_FOUND,
        description: 'Not Found. The requested resource does not exist',
        type: ResponseError404NotFound,
      })
    )
  }
  if (status.includes(405)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.METHOD_NOT_ALLOWED,
        description:
          'Method not allowed. Request method is known by the server but is not supported by the target resource',
        type: ResponseError405ModthodNotAllowed,
      })
    )
  }
  if (status.includes(406)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.NOT_ACCEPTABLE,
        description:
          'Not Acceptable. Request method is known by the server but is not supported by the target resource',
        type: ResponseError406NotAcceptable,
      })
    )
  }
  if (status.includes(415)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.UNSUPPORTED_MEDIA_TYPE,
        description:
          'Unsupported media type. Server refuses to accept the request because the payload format is in an unsupported format',
        type: ResponseError415UnSupported,
      })
    )
  }
  if (status.includes(500)) {
    apiDecorators.push(
      ApiResponse({
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error or Dependency Error',
        type: ResponseError500InternalServerError,
      })
    )
  }

  return applyDecorators(...apiDecorators)
}

export function ApiDefaultSuccessResponse(
  status = 200,
  object?: any,
  defaultType = 'object'
) {
  apiDecorators = []
  let data: any =
    defaultType === 'object' ? { type: 'object' } : { type: 'array' }
  if (object) {
    data = { $ref: getSchemaPath(object) }
  }
  let responseModel: any = {}
  switch (status) {
    case 201:
      responseModel = ResponseSuccess201
      break
    default:
      responseModel = ResponseSuccess200
  }
  apiDecorators.push(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(responseModel) },
          {
            allOf: [
              {
                properties: {
                  data: data,
                },
              },
            ],
          },
        ],
      },
    })
  )
  return applyDecorators(...apiDecorators)
}
