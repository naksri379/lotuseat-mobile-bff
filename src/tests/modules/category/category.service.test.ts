import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/common'
import { CategoryService } from 'src/modules/category/category.service'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { mockProductListResponse } from 'src/tests/mocks/product.service.mock'

jest.mock('src/utilities/logger')

describe('For CategoryService', () => {
  let httpService: HttpService
  let categoryService: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, ProductServiceHelper],
      imports: [HttpModule],
    }).compile()

    httpService = module.get<HttpService>(HttpService)
    categoryService = module.get<CategoryService>(CategoryService)
    const accessTokenResponse: AxiosResponse = {
      data: {
        access_token: '123',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    jest
      .spyOn(categoryService, 'getToken')
      .mockReturnValueOnce(of(accessTokenResponse).toPromise())
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('For getCategoryList method', () => {
    test('when response is not empty then successfully return product list data', async () => {
      const result: AxiosResponse = {
        data: mockProductListResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))

      const actualResult = await categoryService.getCategoryList()
      expect(actualResult).toEqual(mockProductListResponse)
    })

    test('when response is empty then return empty data', async () => {
      const result: AxiosResponse = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))

      const actualResult = await categoryService.getCategoryList()
      expect(actualResult).toEqual([])
    })
  })
})
