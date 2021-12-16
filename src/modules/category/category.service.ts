import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'

import {
  DeleteCategoryRequestDto,
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
  async deleteCategoryById(
    deleteCategoryRequest: DeleteCategoryRequestDto
  ): Promise<void> {
    try {
      await this.httpService
        .delete(
          `https://platform.weomni.com/shop/api/projects/eat/categories/${deleteCategoryRequest.id}`,
          {
            headers: {
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Authorization:
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJjbXMuY3QudyIsInByb2R1Y3Quc2VhcmNoIiwiY21zLmN0LmQiLCJjbXMuY3QucyIsImNtcy5jdC5yIiwic2hvcC5zZWFyY2giLCJicmFuZC5zZWFyY2giLCJjbXMuY3QuKiJdLCJleHAiOjE2Mzk2NDc0NzUsImlhdCI6MTYzOTY0Njg3NSwianRpIjoiZjZlZmU0MTUtMWM1YS00NWYwLWEwZjctY2E1ODI0MjIzNTJhIiwiY2xpZW50X2lkIjoiYzc5OTRiYjAtMDA5Zi00YWNlLWIzZjEtZWJjMmJlZDQ1NTEzIn0.RDiQPJPHDCy4dyHfSv3nk2DBhXU7PvMUdpoih2uXbJkKe130gB7zOh4GwbuHT45GfzRixb13U1avz3M5dpB-xvhFfTFfF_5KmOrcYcl8NgavscRGVKT5JGcDJGP5ny_sFR9wncEtajVghd_yB7Qed8067yzfezo2cvtO_reziQ5Ih1oO55itFFCGTXzSgUgMFrQ5e1OMUdfUpvhxUpxpzxY26VcPRaYK26A7ZhEG-EWYtWnFaMCMNbOIDDPYI3B8mdaap1894XMve-weDik_4e4WkhgPsvEqzFTgjrLrdPii6-TORo4WPMxWBUN2m5By6SvQo7Wj_pFJ_sr2X_ABYg',
              Cookie:
                'AWSALB=712qEDE/dPHkCeg5gDd5SPtwosBu7ODrBJ/F9F/adK4lOV5vTb6+qNnIufAIO1zk4hJGlROQgshyjJjABz39vvqFLWtH0SPy19G6aYOAPOlMClX+lkdQ+hyCL/UF; AWSALBCORS=712qEDE/dPHkCeg5gDd5SPtwosBu7ODrBJ/F9F/adK4lOV5vTb6+qNnIufAIO1zk4hJGlROQgshyjJjABz39vvqFLWtH0SPy19G6aYOAPOlMClX+lkdQ+hyCL/UF; XSRF-TOKEN=3eb39276-b3f6-4119-836e-e611a4a25e5b',
            },
          }
        )
        .toPromise()
    } catch (exception) {
      const { response } = exception

      if (!response) {
        throw CustomError.dependencyError(exception)
      }

      const error = response.data

      switch (error?.status) {
        case 404:
          throw CustomError.notFound(error.detail)

        default:
          throw CustomError.internalServerError(
            error.detail || error.error || error
          )
      }
    }
  }
}
