import { ApiProperty } from '@nestjs/swagger'

/**
 * Example data transfer object with swagger
 */
export class SupportLanguage {
  @ApiProperty()
  en: string

  @ApiProperty()
  th: string
}

export class GetCategoryListResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  projectId: string

  @ApiProperty()
  name: SupportLanguage

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

export class CreateCategoryResponseDto {
  @ApiProperty()
  parentId: string

  @ApiProperty()
  name: SupportLanguage

  @ApiProperty()
  status: string

  @ApiProperty()
  group: string
}

export class UpdateCategoryResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  projectId: string

  @ApiProperty()
  name: SupportLanguage

  @ApiProperty()
  status: string

  @ApiProperty()
  group: string

  @ApiProperty()
  parentId: string
}

export class NameOfCategory {
  en: string
  th: string
}
