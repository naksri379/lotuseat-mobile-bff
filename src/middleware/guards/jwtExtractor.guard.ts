import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import CustomError from 'src/utilities/customError'
import Log from 'src/utilities/logger'
import * as jwt from 'jsonwebtoken'
import * as httpContext from 'express-http-context'
import { CUSTOMER_ID } from 'src/constants/httpContextConstant'

@Injectable()
export class JwtExtractorGuard implements CanActivate {
  private log = new Log()

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const headers = request.headers

    if (headers.authorization) {
      const token = this.removeAuthorizationBearer(headers.authorization)
      const decoded: any = jwt.decode(token, { complete: true })
      if (decoded === null) {
        this.log.generateLogTemplate({ jwt: token })
        throw CustomError.unauthorized('Authorization is invalid')
      } else if (decoded.payload?.customer_uuid) {
        request.headers.customerId = decoded.payload.customer_uuid
        httpContext.set(CUSTOMER_ID, request.headers.customerId)
        this.log.generateLogTemplate(
          `From ${request.method} ${request.originalUrl}`
        )
        this.log.generateLogTemplate({
          customer_uuid: request.headers.customerId,
        })
        if (decoded.payload.surrogate_id) {
          request.headers.surrogateId = decoded.payload.surrogate_id
          this.log.generateLogTemplate({
            surrogate_id: request.headers.surrogateId,
          })
        }
        return true
      } else {
        this.log.generateLogTemplate({ jwt: token })
        throw CustomError.unauthorized('Cannot extract claims customer_uuid')
      }
    } else {
      return true
    }
  }

  private removeAuthorizationBearer(token: string) {
    const regex = /^Bearer\s/i
    return token.replace(regex, '')
  }
}
