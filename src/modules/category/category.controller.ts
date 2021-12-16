import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import {  
    ApiExtraModels,
    ApiHeaders,
    ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ResponseSuccess200 } from 'src/domains/responseSuccess.dto';
import {
  ApiDefaultErrorResponse,
  ApiDefaultSuccessResponse,
} from 'src/middleware/decorator'
import { JwtExtractorGuard } from 'src/middleware/guards/jwtExtractor.guard';
import { JoiValidationPipe } from 'src/middleware/pipes/joiValidation.pipe';
import { CREATE_CATEGORY_REQUEST_SCHEMA, GET_CATEGORY_LIST_REQUEST_SCHEMA } from 'src/utilities/schemas/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto, GetCategoryListRequestDto } from './models/category.request';
import { GetCategoryListResponseDto } from './models/category.response';


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
@ApiExtraModels(ResponseSuccess200, GetCategoryListResponseDto)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({ summary: 'category list' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse()
  @Get('/v1/list')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(GET_CATEGORY_LIST_REQUEST_SCHEMA))
  async getCategoryList(
    @Query() query: GetCategoryListRequestDto
  ): Promise<GetCategoryListResponseDto[]> {
    return this.categoryService.getCategoryList(query)
  }

  @ApiOperation({ summary: 'category' })
  @ApiDefaultSuccessResponse(200, GetCategoryListResponseDto)
  @ApiDefaultErrorResponse()
  @Post('/v1/create')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(CREATE_CATEGORY_REQUEST_SCHEMA))
  async createCategory(
    @Body() post: CreateCategoryRequestDto
  ): Promise<GetCategoryListResponseDto[]> {
    return this.categoryService.createCategory(post)
  }

}
