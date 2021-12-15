import { ApiProperty } from '@nestjs/swagger'

/**
 * Example data transfer object with swagger
 */
export class GetCategoryListResponseDto {
  @ApiProperty()
  categoryId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  quanity: number

  @ApiProperty()
  price: number
}
