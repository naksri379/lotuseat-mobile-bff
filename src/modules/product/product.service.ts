import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'

import { ProductServiceHelper } from './product.service.helper'
import { GetProductListRequestDto } from './models/product.request'
import { GetProductListResponseDto } from './models/product.response'
import { mockProductListRawData } from '../../tests/mocks/product.service.mock'

@Injectable()
export class ProductService {
  constructor(
    private readonly httpService: HttpService,
    private readonly productServiceHelper: ProductServiceHelper
  ) {}

  @ExecuteTimeLog()
  async getProductList(
    getProductListRequest: GetProductListRequestDto
  ): Promise<GetProductListResponseDto[]> {
    const payload = await this.httpService
      .get(
        // 'https://api.dev.customer.it-lotus.com/lotusseat-mobile-bff/actuator/health',
        'https://google.com',
        {
          data: getProductListRequest, // example send data
        }
      )
      .toPromise()

    if (payload.status === 200) {
      return this.productServiceHelper.mapProductListResponse(
        mockProductListRawData
      )
    }
  }
}
