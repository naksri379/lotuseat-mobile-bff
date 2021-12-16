import { ApiProperty } from '@nestjs/swagger'
import { string } from 'joi'

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

export class CreateCategoryRequestDto {

  @ApiProperty({
    name: 'categoryId',
    required: true,
    type: Number
  })
  categoryId: number

  @ApiProperty({
    name: 'name',
    required: true,
    type: String
  })
  name: string

  @ApiProperty({
    name: 'quanity',
    required: true,
    type: Number
  })
  quanity: string

  @ApiProperty({
    name: 'price',
    required: true,
    type: Number
  })
  price: string
 
}
