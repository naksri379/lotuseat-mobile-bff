import {
  INVALID_PARAMS,
  UNAUTHORIZED,
  DATA_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  DEPENDENCY_ERROR,
  CONFLICT,
  TOO_MANY_REQUEST,
  FORBIDDEN,
} from '../constants/errorConstant'

export default class CustomError extends Error {
  statusCode: number
  error: any
  errorDescription?: any
  stack: any
  additionalErrorDescription: any
  __proto__ = Error

  constructor(
    statusCode: number,
    error: any,
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    super()
    this.statusCode = statusCode
    this.error = error
    this.errorDescription = errorDescription
    this.additionalErrorDescription = additionalErrorDescription
    // set property for stack instead of this.stack = stack
    Object.defineProperty(this, 'stack', {
      value: stack,
      writable: true,
      enumerable: true,
    })
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  static badRequest(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      400,
      INVALID_PARAMS,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static unauthorized(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      401,
      UNAUTHORIZED,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static notFound(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      404,
      DATA_NOT_FOUND,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static internalServerError(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      500,
      INTERNAL_SERVER_ERROR,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static dependencyError(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      500,
      DEPENDENCY_ERROR,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static conflict(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      409,
      CONFLICT,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static tooManyRequest(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      429,
      TOO_MANY_REQUEST,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }

  static forbidden(
    errorDescription?: any,
    stack?: any,
    additionalErrorDescription?: any
  ) {
    return new CustomError(
      403,
      FORBIDDEN,
      errorDescription,
      stack,
      additionalErrorDescription
    )
  }
}
