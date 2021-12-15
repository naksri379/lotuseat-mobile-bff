import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import * as httpContext from 'express-http-context'
import { X_REQUEST_ID } from '../../constants/httpContextConstant'
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../../constants/errorConstant'
import CustomError from '../../utilities/customError'
import Log from 'src/utilities/logger'

@Catch(Error)
export class RuntimeExceptionsFilter implements ExceptionFilter {
  private log = new Log()
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    this.log.generateLogTemplate(exception.stack)
    let code = 500
    let traceId = httpContext.get(X_REQUEST_ID)
    let description = 'internal server error'
    let detail = 'internal server error'
    let type = INTERNAL_SERVER_ERROR.toUpperCase()
    if (exception instanceof HttpException && exception.getStatus() === 404) {
      code = exception.getStatus()
      traceId = httpContext.get(X_REQUEST_ID)
      description = exception.message
      detail = exception.message
      type = NOT_FOUND.toUpperCase()
    }

    const payload = {
      error: {
        code,
        type,
        description,
        detail,
        traceId,
      },
    }

    response.status(code).json(payload)
  }
}

@Catch(CustomError)
export class CustomErrorExceptionsFilter implements ExceptionFilter {
  private log = new Log()
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    this.log.generateLogTemplate(exception.stack)
    const code = exception.statusCode || 500
    const traceId = httpContext.get(X_REQUEST_ID)
    const description =
      exception?.additionalErrorDescription || exception?.errorDescription
    const detail = exception.errorDescription || 'internal server error'
    const type = (exception.error || INTERNAL_SERVER_ERROR).toUpperCase()

    const payload = {
      error: {
        code,
        type,
        description,
        detail,
        traceId,
      },
    }

    response.status(code).json(payload)
  }
}
