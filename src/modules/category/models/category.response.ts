import { ApiProperty } from '@nestjs/swagger'

/**
 * Example data transfer object with swagger
 */
export class GetCategoryListResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  projectId: string

  @ApiProperty()
  nameTh: string

  @ApiProperty()
  nameEn: string

  @ApiProperty()
  status: string

  @ApiProperty()
  group: string

  @ApiProperty()
  externalRef: string

  @ApiProperty()
  parentExternalRef: string

  @ApiProperty()
  batchId: string

  @ApiProperty()
  source: string
}
