import { HttpService, Injectable } from '@nestjs/common'
import CustomError from 'src/utilities/customError'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'
import { GetCategoryByIdRequestDto } from './models/category.request'
import { GetCategoryListResponseDto } from './models/category.response'
const qs = require('querystring')
@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  @ExecuteTimeLog()
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
    try {
      const payload = await this.httpService
        .post(process.env.WEOMNI_URL_TOKEN, qs.stringify(requestBody), config)
        .toPromise()
      if (payload.status === 200) {
        return payload.data.access_token
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
  async getCategoryList(): Promise<GetCategoryListResponseDto[]> {
    const payload = await this.httpService
      .get(
        // 'https://api.dev.customer.it-lotus.com/lotusseat-mobile-bff/actuator/health',
        'https://google.com',
        {
          // data: getCategoryListRequest, // example send data
        }
      )
      .toPromise()

    if (payload.status === 200) {
      return payload.data
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
          `${process.env.WEOMNI_URL}/shop/api/projects/eat/categories/${getCategoryByIdRequest.id}`,
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
}
