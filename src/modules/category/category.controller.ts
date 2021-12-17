import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResponseSuccess200 } from 'src/domains/responseSuccess.dto'
import {
  ApiDefaultErrorResponse,
  ApiDefaultSuccessResponse,
} from 'src/middleware/decorator'

import { JwtExtractorGuard } from 'src/middleware/guards/jwtExtractor.guard'
import { JoiValidationPipe } from 'src/middleware/pipes/joiValidation.pipe'
import {
  GET_CATEGORY_BY_ID_REQUEST_SCHEMA,
  DELETE_CATEGORY_BY_ID_REQUEST_SCHEMA,
  GET_CATEGORY_LIST_REQUEST_SCHEMA,
  CREATE_CATEGORY_REQUEST_SCHEMA,
  UPDATE_CATEGORY_REQUEST_SCHEMA,
} from 'src/utilities/schemas/category.schema'
import { CategoryService } from './category.service'
import {
  GetCategoryByIdRequestDto,
  DeleteCategoryRequestDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from './models/category.request'
import {
  CreateCategoryResponseDto,
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
  @ApiDefaultErrorResponse(404)
  @Get('/v1/token')
  @UseGuards(JwtExtractorGuard)
  async getOmniToken() {
    return this.categoryService.getToken()
  }

  @ApiOperation({ summary: 'category list' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse(404)
  @Get('/v1/list')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(GET_CATEGORY_LIST_REQUEST_SCHEMA))
  async getCategoryList(): Promise<GetCategoryListResponseDto[]> {
    return this.categoryService.getCategoryList()
  }

  @ApiOperation({ summary: 'find category by Id' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse(404)
  @Get('/v1/:id')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(GET_CATEGORY_BY_ID_REQUEST_SCHEMA))
  async getCategoryByID(
    @Param() query: GetCategoryByIdRequestDto
  ): Promise<GetCategoryListResponseDto> {
    return this.categoryService.getCategoryById(query)
  }

  @ApiOperation({ summary: 'create category' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse(400)
  @Post('/v1/create')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(CREATE_CATEGORY_REQUEST_SCHEMA))
  async createCategory(
    @Body() post: CreateCategoryRequestDto
  ): Promise<CreateCategoryResponseDto[]> {
    return this.categoryService.createCategory(post)
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

  @ApiOperation({ summary: 'delete category' })
  @ApiDefaultErrorResponse(404)
  @Delete('/v1/:id')
  @HttpCode(204)
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(DELETE_CATEGORY_BY_ID_REQUEST_SCHEMA))
  async deleteCategory(
    @Param() query: DeleteCategoryRequestDto
  ): Promise<void> {
    await this.categoryService.deleteCategoryById(query)
  }
}
