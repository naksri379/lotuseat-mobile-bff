import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'
import {
  GetCategoryByIdRequestDto,
  GetCategoryListRequestDto,
} from './models/category.request'
import { GetCategoryListResponseDto } from './models/category.response'
import { mockCategoryListRawData } from '../../tests/mocks/category.service.mock'
import { CategoryServiceHelper } from './category.service.helper'
import CustomError from 'src/utilities/customError'

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

  @ExecuteTimeLog()
  async getCategoryById(
    getCategoryByIdRequest: GetCategoryByIdRequestDto
  ): Promise<GetCategoryListResponseDto> {
    const payload = await this.httpService
      .get(
        // 'https://api.dev.customer.it-lotus.com/lotusseat-mobile-bff/actuator/health',
        'https://google.com',
        {
          // data: getCategoryByIdRequest, // example send data
        }
      )
      .toPromise()

    if (payload.status === 200) {
      const mapCategoryList =
        this.categoryServiceHelper.mapCategoryListResponse(
          mockCategoryListRawData
        )

      const result = mapCategoryList.find(
        (category) =>
          category.id.toString() === getCategoryByIdRequest.id.toString()
      )

      if (!result) {
        throw CustomError.notFound(`Category not found.`)
      }

      return result
    }
  }
}
