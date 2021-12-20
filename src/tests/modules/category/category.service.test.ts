import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/common'
import { CategoryService } from 'src/modules/category/category.service'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { mockProductListResponse } from 'src/tests/mocks/product.service.mock'
import { UpdateCategoryRequestDto } from 'src/modules/category/models/category.request'
import { mockCategoryListResponse, mockUpdatedCategoryData } from 'src/tests/mocks/category.service.mock'
import { UpdateCategoryResponseDto } from 'src/modules/category/models/category.response'
import CustomError from 'src/utilities/customError'

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
  })

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

  describe('For updateCategory method', () => {
    test('when response is not empty then successfully return updated category data', async () => {
      const inputData: UpdateCategoryRequestDto = {
        id: '1a111a1aaaa111a111111111',
        name: {
          en: 'Electronics 2',
          th: 'อุปกรณ์อิเล็กทรอนิกส์ 2'
        },
        status: 'ACTIVE',
        parentId: '',
        group: 'PRODUCT',
      }
      const resultGet: AxiosResponse = {
        data: mockCategoryListResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      const resultPut: AxiosResponse = {
        data: mockUpdatedCategoryData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(resultGet))
      jest.spyOn(httpService, 'put').mockReturnValueOnce(of(resultPut))
      try {
        const actualResult: UpdateCategoryResponseDto = 
          await categoryService.updateCategory(inputData)
        expect(actualResult).toEqual(mockUpdatedCategoryData)
      } catch (exception) {
        expect(exception).toBeInstanceOf(CustomError)
        expect(exception).toHaveProperty('statusCode', 404)
      }
    })

    test('when id of category from input does not exist in category list, return error message with 404 not found', async () => {
      const inputData: UpdateCategoryRequestDto = {
        id: '1a111a1aaaa111a22222222',
        name: {
          en: 'Electronics 2',
          th: 'อุปกรณ์อิเล็กทรอนิกส์ 2'
        },
        status: 'ACTIVE',
        parentId: '',
        group: 'PRODUCT',
      }
      const resultGet: AxiosResponse = {
        data: mockCategoryListResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      const resultPut: AxiosResponse = {
        data: mockUpdatedCategoryData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(resultGet))
      jest.spyOn(httpService, 'put').mockReturnValueOnce(of(resultPut))
      try {
        const actualResult: UpdateCategoryResponseDto = 
          await categoryService.updateCategory(inputData)
        expect(actualResult).toEqual(mockUpdatedCategoryData)
      } catch (exception) {
        expect(exception).toBeInstanceOf(CustomError)
        expect(exception).toHaveProperty('statusCode', 404)
      }
    })
  })
})
