import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { X_REQUEST_ID } from '../../constants/httpContextConstant'
import { v4 } from 'uuid'
import * as httpContext from 'express-http-context'
import Log from '../../utilities/logger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const now = Date.now()
    const { method, originalUrl } = request
    httpContext.set(X_REQUEST_ID, request.headers['x-request-id'] || v4())

    const log = new Log()
    log.generateLogTemplate(`Begin Processing`)
    log.generateLogTemplate(`Request ${method} ${originalUrl}`)
    if (Object.keys(request.body).length) {
      log.generateLogTemplate(request.body)
    }

    response.on('finish', () => {
      const delay = Date.now() - now
      log.generateLogTemplate(`Processing time ${delay} ms`)
    })

    next()
  }
}
