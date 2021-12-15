import { ApiProperty } from '@nestjs/swagger'
import { ErrorStatus } from 'src/enums/httpStatus.enum'
class ResponseErrorDescriptionDto {
  @ApiProperty()
  description: string

  @ApiProperty()
  detail: string

  @ApiProperty()
  traceId: string
}
export class Error400InvalidParams extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.INVALID_PARAMS,
    description: 'invalid params',
  })
  code: number

  @ApiProperty({
    example: 'INVALID_PARAMS',
  })
  type: string
}

export class Error401InvalidKey extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.INVALID_KEY,
    description: 'invalid key or unauthorized',
  })
  code: number

  @ApiProperty({
    example: 'INVALID_KEY OR UNAUTHORIZED',
  })
  type: string
}

export class Error403Forbidden extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.FORBIDDEN,
    description: 'forbidden',
  })
  code: number

  @ApiProperty({
    example: 'FORBIDDEN',
  })
  type: string
}

export class Error404NotFound extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.NOT_FOUND,
    description: 'not found',
  })
  code: number

  @ApiProperty({
    example: 'NOT_FOUND',
  })
  type: string
}

export class Error405MethodNotAllowed extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.METHOD_NOT_ALLOWED,
    description: 'medthod not allowed',
  })
  code: number

  @ApiProperty({
    example: 'METHOD_NOT_ALLOWED',
  })
  type: string
}

export class Error406NotAcceptable extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.NOT_ACCEPTABLE,
    description: 'not acceptable',
  })
  code: number

  @ApiProperty({
    example: 'NOT_ACCEPTABLE',
  })
  type: string
}

export class Error415UnSupported extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.UNSUPPORTED_MEDIA_TYPE,
    description: 'unsupported media type',
  })
  code: number

  @ApiProperty({
    example: 'UNSUPPORTED_MEDIA_TYPE',
  })
  type: string
}

export class Error500InternalServerError extends ResponseErrorDescriptionDto {
  @ApiProperty({
    example: ErrorStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error or dependency error',
  })
  code: number

  @ApiProperty({
    example: 'INTERNAL_SERVER_ERROR OR DEPENDENCY ERROR',
  })
  type: string
}
