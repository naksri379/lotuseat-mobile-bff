import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/common'
import { CategoryService } from 'src/modules/category/category.service'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { mockProductListResponse } from 'src/tests/mocks/product.service.mock'
import { CreateCategoryRequestDto } from 'src/modules/category/models/category.request'

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

  describe('creat category method', () => {
    test('when create category is successful then return create data in mock data list', async () => {
      const mockCreateCategory: CreateCategoryRequestDto = {
        parentId: '11111',
        en: 'General',
        th: 'ทั่วไป',
        status: 'ACTIVE',
        group: 'PRODUCT',
      }
      const result: AxiosResponse = {
        data: mockCreateCategory,
        status: 201,
        statusText: 'CREATED',
        headers: {},
        config: {},
      }

      jest.spyOn(httpService, 'post').mockReturnValueOnce(of(result))
      // jest
      // .spyOn(categoryServiceHelper, 'mapCategoryListResponse')
      // .mockReturnValueOnce(mockCategoryListResponse)

      const actualResult = await categoryService.createCategory(
        mockCreateCategory
      )
      expect(actualResult).toEqual(mockCreateCategory)
    })
  })
})
