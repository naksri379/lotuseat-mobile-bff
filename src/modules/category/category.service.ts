import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'

//import { CategoryServiceHelper } from './category.service.helper'
import { GetCategoryListRequestDto } from './models/category.request'
import { GetCategoryListResponseDto } from './models/category.response'
import { mockCategoryListRawData } from '../../tests/mocks/category.service.mock'
import { CategoryServiceHelper } from './category.service.helper'

@Injectable()
export class CategoryService {
  constructor(
    private readonly httpService: HttpService,
    private readonly categoryServiceHelper: CategoryServiceHelper
  ) {}

  @ExecuteTimeLog()
  async getCategoryList(
    getCategoryListRequest: GetCategoryListRequestDto
  ): Promise<GetCategoryListResponseDto[]> {
    const payload = await this.httpService
      .get(
        // 'https://api.dev.customer.it-lotus.com/lotusseat-mobile-bff/actuator/health',
        'https://google.com',
        {
          data: getCategoryListRequest, // example send data
        }
      )
      .toPromise()

    if (payload.status === 200) {
      return this.categoryServiceHelper.mapCategoryListResponse(
        mockCategoryListRawData
      )
    }
  }
}
