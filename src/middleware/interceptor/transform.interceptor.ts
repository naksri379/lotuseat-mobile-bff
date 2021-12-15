import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map((data) => {
        const payload: any = {
          status: {
            code: response.statusCode,
            message: response.statusCode === 201 ? 'created' : 'success',
          },
          data,
        }

        return payload
      })
    )
  }
}
