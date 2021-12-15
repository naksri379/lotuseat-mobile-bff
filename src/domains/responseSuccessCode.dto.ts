import { ApiProperty } from '@nestjs/swagger'
export class Success200 {
  @ApiProperty({
    example: 200,
  })
  code: number

  @ApiProperty({
    example: 'success',
  })
  message: string
}

export class Success201 {
  @ApiProperty({
    example: 201,
  })
  code: number

  @ApiProperty({
    example: 'created',
  })
  message: string
}
