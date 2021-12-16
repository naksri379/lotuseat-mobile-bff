import { ApiProperty } from '@nestjs/swagger'
import { array, string } from 'joi'

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
    name: 'id',
    required: true,
    type: String
  })
  id: string

  @ApiProperty({
    name: 'en',
    required: true,
    type: String
  })
  en: string

  @ApiProperty({
    name: 'th',
    required: true,
    type: String
  })
  th: string

  @ApiProperty({
    name: 'status',
    required: true,
    type: String
  })
  status: string

  @ApiProperty({
    name: 'group',
    required: true,
    type: String
  })
  group: string
 
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
