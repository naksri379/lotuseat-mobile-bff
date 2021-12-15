import { ApiProperty } from '@nestjs/swagger'

/**
 * Example data transfer object with swagger
 */
export class CreateCategoryDto {
  @ApiProperty()
  categoryId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  quanity: number

  @ApiProperty()
  price: number
}