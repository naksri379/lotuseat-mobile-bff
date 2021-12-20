import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'

import { GetCategoryListResponseDto } from './models/category.response'

@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

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
}
