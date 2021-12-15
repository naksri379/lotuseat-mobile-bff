import { Controller, Get, UsePipes, UseGuards, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { JoiValidationPipe } from 'src/middleware/pipes/joiValidation.pipe'
import { GET_PRODUCT_LIST_REQUEST_SCHEMA } from 'src/utilities/schemas/product.schema'
import {
  ApiExtraModels,
  ApiHeaders,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { JwtExtractorGuard } from 'src/middleware/guards/jwtExtractor.guard'
import {
  ApiDefaultErrorResponse,
  ApiDefaultSuccessResponse,
} from 'src/middleware/decorator'
import { GetProductListRequestDto } from './models/product.request'
import { GetProductListResponseDto } from './models/product.response'
import { ResponseSuccess200 } from '../../domains/responseSuccess.dto'

@ApiTags('product')
@ApiHeaders([
  {
    name: 'key',
    description: 'API key for authorization',
  },
  {
    name: 'X-Request-ID',
    description: 'Correlates HTTP requests between a client and server',
  },
])
@Controller('product')
@ApiExtraModels(ResponseSuccess200, GetProductListResponseDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'product list' })
  @ApiDefaultSuccessResponse(200, GetProductListResponseDto)
  @ApiDefaultErrorResponse()
  @Get('/v1/list')
  @UseGuards(JwtExtractorGuard)
  @UsePipes(new JoiValidationPipe(GET_PRODUCT_LIST_REQUEST_SCHEMA))
  async getProductList(
    @Query() query: GetProductListRequestDto
  ): Promise<GetProductListResponseDto[]> {
    return this.productService.getProductList(query)
  }
}
