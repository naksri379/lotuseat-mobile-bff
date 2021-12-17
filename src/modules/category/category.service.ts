import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'
import {
  GetCategoryByIdRequestDto,
  DeleteCategoryRequestDto,
  GetCategoryListRequestDto,
} from './models/category.request'
import { GetCategoryListResponseDto } from './models/category.response'
import { CategoryServiceHelper } from './category.service.helper'

const qs = require('querystring')
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
    try {
      const token = await this.getToken()

      const payload = await this.httpService
        .get(`https://platform.weomni.com/shop/api/projects/eat/categories`, {
          headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Authorization: `Bearer ${token}`,
            Cookie:
              'AWSALB=712qEDE/dPHkCeg5gDd5SPtwosBu7ODrBJ/F9F/adK4lOV5vTb6+qNnIufAIO1zk4hJGlROQgshyjJjABz39vvqFLWtH0SPy19G6aYOAPOlMClX+lkdQ+hyCL/UF; AWSALBCORS=712qEDE/dPHkCeg5gDd5SPtwosBu7ODrBJ/F9F/adK4lOV5vTb6+qNnIufAIO1zk4hJGlROQgshyjJjABz39vvqFLWtH0SPy19G6aYOAPOlMClX+lkdQ+hyCL/UF; XSRF-TOKEN=3eb39276-b3f6-4119-836e-e611a4a25e5b',
          },
        })
        .toPromise()

      if (payload.status === 200) {
        return payload.data
      }
    } catch (exception) {
      const { response } = exception

      if (!response) {
        throw CustomError.internalServerError(exception)
      }

      const error = response.data

      switch (error?.status) {
        case 404:
          throw CustomError.notFound(error.detail)

        default:
          throw CustomError.dependencyError(
            error.detail || error.error || error
          )
      }
    }
  }

  @ExecuteTimeLog()
  async getCategoryById(
    getCategoryByIdRequest: GetCategoryByIdRequestDto
  ): Promise<GetCategoryListResponseDto> {
    try {
      const token = await this.getToken()

      const payload = await this.httpService
        .get(
          `https://platform.weomni.com/shop/api/projects/eat/categories/${getCategoryByIdRequest.id}`,
          {
            headers: {
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Authorization: `Bearer ${token}`,
              Cookie:
                'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
            },
          }
        )
        .toPromise()

      if (payload.status === 200) {
        return payload.data
      }
    } catch (exception) {
      const { response } = exception

      if (!response) {
        throw CustomError.internalServerError(exception)
      }

      const error = response.data

      switch (error?.status) {
        case 404:
          throw CustomError.notFound(error.detail)

        default:
          throw CustomError.dependencyError(
            error.detail || error.error || error
          )
      }
    }
  }

  async getToken() {
    const requestBody = {
      grant_type: 'client_credentials',
    }
    const config = {
      headers: {
        Cookie:
          'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${process.env.ENCOED_TOKEN}`,
        'Accept-Encoding': 'gzip, deflate, br',
      },
    }
    const url = 'https://platform.weomni.com/uaa/oauth/token'
    const payload = await this.httpService
      .post(url, qs.stringify(requestBody), config)
      .toPromise()

    return payload.data.access_token
  }

  @ExecuteTimeLog()
  async deleteCategoryById(
    deleteCategoryRequest: DeleteCategoryRequestDto
  ): Promise<void> {
    try {
      const token = await this.getToken()

      await this.httpService
        .delete(
          `https://platform.weomni.com/shop/api/projects/eat/categories/${deleteCategoryRequest.id}`,
          {
            headers: {
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Authorization: `Bearer ${token}`,
              Cookie:
                'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
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
