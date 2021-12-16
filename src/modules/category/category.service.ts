import { HttpService, Injectable } from '@nestjs/common'
import { ExecuteTimeLog } from '../../middleware/decorator/executeTimeLog.decorator'

//import { CategoryServiceHelper } from './category.service.helper'
import { CreateCategoryRequestDto, GetCategoryListRequestDto } from './models/category.request'
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

  async createCategory(
    createCategory: CreateCategoryRequestDto
  ): Promise<GetCategoryListResponseDto[]> {
    const createCategoryModel = {
      Id: createCategory.id,
      ProjectId: 'eat',
      Name: {
        Th: createCategory.en,
        En: createCategory.th
      },
      Status: createCategory.status,
      Group: createCategory.group,
      ExternalRef: 'wemal_cat_001',
      ParentExternalRef: '',
      BatchId: '2020-10-25T10:02:111',
      Source: 'wemall'
    }
    
    const payload = await this.httpService
      .get(
        // 'https://api.dev.customer.it-lotus.com/lotusseat-mobile-bff/actuator/health',
        'https://platform.weomni.com/shop/api/projects/eat/category',
        {
          data: createCategoryModel, // example send data
        }
      )
      .toPromise()

    mockCategoryListRawData.push(
      createCategoryModel
    )
    
    console.log("🚀 ~ file: category.service.ts ~ line 71 ~ CategoryService ~ payload.status", payload.status)
    if(payload.status === 201)
      return this.categoryServiceHelper.mapCategoryListResponse(
        mockCategoryListRawData
      )
    
  }
}
