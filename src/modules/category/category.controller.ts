import { Body, Controller, Get, Put, UseGuards, UsePipes } from '@nestjs/common'
import {
  ApiExtraModels,
  // ApiHeaders,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ResponseSuccess200 } from 'src/domains/responseSuccess.dto'
import {
  ApiDefaultErrorResponse,
  ApiDefaultSuccessResponse,
} from 'src/middleware/decorator'
import { JwtExtractorGuard } from 'src/middleware/guards/jwtExtractor.guard'
import { JoiValidationPipe } from 'src/middleware/pipes/joiValidation.pipe'
import {
  GET_CATEGORY_LIST_REQUEST_SCHEMA,
  UPDATE_CATEGORY_REQUEST_SCHEMA,
} from 'src/utilities/schemas/category.schema'
import { CategoryService } from './category.service'
import { UpdateCategoryRequestDto } from './models/category.request'
import {
  GetCategoryListResponseDto,
  UpdateCategoryResponseDto,
} from './models/category.response'

@ApiTags('category')
// @ApiHeaders([
//   {
//     name: 'key',
//     description: 'API key for authorization',
//   },
//   {
//     name: 'X-Request-ID',
//     description: 'Correlates HTTP requests between a client and server',
//   },
// ])
@Controller('category')
@ApiExtraModels(
  ResponseSuccess200,
  GetCategoryListResponseDto,
  UpdateCategoryResponseDto
)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'get token' })
  @ApiDefaultSuccessResponse(200)
  @ApiDefaultErrorResponse(401)
  @Get('/v1/gettoken')
  @UseGuards(JwtExtractorGuard)
  async getToken() {
    return this.categoryService.getToken()
  }

  @ApiOperation({ summary: 'category list' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse()
  @Get('/v1/list')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(GET_CATEGORY_LIST_REQUEST_SCHEMA))
  async getCategoryList(): Promise<GetCategoryListResponseDto[]> {
    return this.categoryService.getCategoryList()
  }

  @ApiOperation({ summary: 'update category' })
  @ApiDefaultSuccessResponse(200, UpdateCategoryResponseDto)
  @ApiDefaultErrorResponse(404)
  @Put('/v1/update')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(UPDATE_CATEGORY_REQUEST_SCHEMA))
  async updateCategoryList(
    @Body() query: UpdateCategoryRequestDto
  ): Promise<UpdateCategoryResponseDto> {
    return this.categoryService.updateCategory(query)
  }
}
