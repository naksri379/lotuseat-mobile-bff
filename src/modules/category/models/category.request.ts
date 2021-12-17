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
    name: 'parentId',
    required: true,
    type: String,
  })
  parentId: string

  @ApiProperty({
    name: 'en',
    required: true,
    type: String,
  })
  en: string

  @ApiProperty({
    name: 'th',
    required: true,
    type: String,
  })
  th: string

  @ApiProperty({
    name: 'status',
    required: true,
    type: String,
  })
  status: string

  @ApiProperty({
    name: 'group',
    required: true,
    type: String,
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

export class UpdateCategoryRequestDto {
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: 'The id of category.',
  })
  id: string

  @ApiProperty({
    name: 'nameEn',
    required: true,
    type: String,
    description: 'The english name of data source.',
  })
  nameEn: string

  @ApiProperty({
    name: 'nameTh',
    required: true,
    type: String,
    description: 'The thai name of data source',
  })
  nameTh: string

  @ApiProperty({
    name: 'status',
    required: true,
    type: String,
    description:
      "The status of category if this available that status is 'ACTIVE'",
  })
  status: string

  @ApiProperty({
    name: 'parentId',
    required: false,
    type: String,
    description: 'The brand of product.',
  })
  parentId: string

  @ApiProperty({
    name: 'group',
    required: true,
    type: String,
    description: 'The list of shops of product.',
  })
  group: string
}
