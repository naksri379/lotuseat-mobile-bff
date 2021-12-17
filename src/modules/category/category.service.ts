import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'
import { GetCategoryListRequestDto } from './models/category.request'
import { GetCategoryListResponseDto } from './models/category.response'
import { mockCategoryListRawData } from '../../tests/mocks/category.service.mock'
import { CategoryServiceHelper } from './category.service.helper'
import { weOmniAuth } from 'src/utilities/weOmniAuth'
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
        mockCategoryListRawData)      
    }
  }

    async getToken() {
    const requestBody = {
      grant_type: 'client_credentials',
    }    
  //   const config = {
  //     headers: {
  //            'Cookie' : 'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
  //       'Content-Type': 'application/x-www-form-urlencoded', 
  //       'Authorization': `Basic ${process.env.ENCOED_TOKEN}`,
  //       'Accept-Encoding': 'gzip, deflate, br',
  //     }
  //   }
  //   let url = 'https://platform.weomni.com/uaa/oauth/token'
  //   const payload = await this.httpService
  //   .post(url, JSON.stringify(requestBody), config)
  //   .toPromise()
     
  //   console.log('res',payload.data.access_token)
  //   return payload.data.access_token

      return await weOmniAuth(requestBody)
   }
    
 
  }

