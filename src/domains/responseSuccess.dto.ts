import { ApiProperty } from '@nestjs/swagger'
import { Success200, Success201 } from './responseSuccessCode.dto'

export class ResponseSuccess200 {
  @ApiProperty({
    type: Success200,
  })
  status: Success200
}

export class ResponseSuccess201 {
  @ApiProperty({
    type: Success201,
  })
  status: Success201
}
