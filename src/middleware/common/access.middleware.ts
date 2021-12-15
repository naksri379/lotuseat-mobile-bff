import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { INVALID_KEY } from '../../constants/errorConstant'
import CustomError from '../../utilities/customError'

@Injectable()
export class AccessMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    if (!request.headers.key || request.headers.key !== process.env.API_KEY) {
      throw new CustomError(
        401,
        INVALID_KEY,
        'Access denied due to invalid key'
      )
    }

    next()
  }
}
