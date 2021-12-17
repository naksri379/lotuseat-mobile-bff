import { ApiProperty } from '@nestjs/swagger'

/**
 * Example data transfer object with swagger
 */
export class GetCategoryListRequestDto {
  @ApiProperty({
    name: 'offset',
    required: true,
    type: Number,
    description:
      'The number of items to skip before starting to collect the result set',
  })
  offset: number

  @ApiProperty({
    name: 'limit',
    required: true,
    type: Number,
    description: 'The numbers of items to return.',
  })
  limit: number
}

export class GetCategoryByIdRequestDto {
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: 'The Id of category',
  })
  id: string
}
export class DeleteCategoryRequestDto {
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: 'The Id of item',
  })
  id: string
}
