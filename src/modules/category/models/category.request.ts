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

export class DeleteCategoryRequestDto {
  @ApiProperty({
    name: 'id',
    required: true,
    type: String,
    description: 'The id of category.',
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
    description: 'The status of category if this available that status is \'ACTIVE\'',
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
