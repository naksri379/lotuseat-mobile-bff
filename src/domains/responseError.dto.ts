import { ApiProperty } from '@nestjs/swagger'
import {
  Error400InvalidParams,
  Error401InvalidKey,
  Error403Forbidden,
  Error404NotFound,
  Error405MethodNotAllowed,
  Error406NotAcceptable,
  Error415UnSupported,
  Error500InternalServerError,
} from './responseErrorCode.dto'
export class ResponseError400InvalidParam {
  @ApiProperty({
    type: Error400InvalidParams,
  })
  error: Error400InvalidParams
}

export class ResponseError401InvalidKey {
  @ApiProperty({
    type: Error401InvalidKey,
  })
  error: Error401InvalidKey
}

export class ResponseError403Forbidden {
  @ApiProperty({
    type: Error403Forbidden,
  })
  error: Error403Forbidden
}

export class ResponseError404NotFound {
  @ApiProperty({
    type: Error404NotFound,
  })
  error: Error404NotFound
}

export class ResponseError405ModthodNotAllowed {
  @ApiProperty({
    type: Error405MethodNotAllowed,
  })
  error: Error405MethodNotAllowed
}
export class ResponseError406NotAcceptable {
  @ApiProperty({
    type: Error406NotAcceptable,
  })
  error: Error406NotAcceptable
}

export class ResponseError415UnSupported {
  @ApiProperty({
    type: Error415UnSupported,
  })
  error: Error415UnSupported
}

export class ResponseError500InternalServerError {
  @ApiProperty({
    type: Error500InternalServerError,
  })
  error: Error500InternalServerError
}
