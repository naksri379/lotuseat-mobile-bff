import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/common'
import { CategoryService } from 'src/modules/category/category.service'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { mockProductListResponse } from 'src/tests/mocks/product.service.mock'
import { mockCategoryListResponse } from 'src/tests/mocks/category.service.mock'
import { GetCategoryListResponseDto } from 'src/modules/category/models/category.response'
import { DeleteCategoryRequestDto } from 'src/modules/category/models/category.request'
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

  describe('For deleteCategoryById method', () => {
    test('when request id is match then finish without throw', async () => {
      const expectedResult: GetCategoryListResponseDto =
        mockCategoryListResponse[0]
      const result: AxiosResponse = {
        data: null,
        status: 204,
        statusText: 'No Content',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'delete').mockReturnValueOnce(of(result))

      await expect(
        categoryService.deleteCategoryById({
          id: expectedResult.id,
        } as DeleteCategoryRequestDto)
      ).resolves.not.toThrow()
    })

    test('when request id is not match then throw 404', async () => {
      const result: AxiosResponse = {
        data: mockCategoryListResponse,
        status: 404,
        statusText: 'NOT FOUND',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'delete').mockReturnValueOnce(of(result))

      try {
        await categoryService.deleteCategoryById({
          id: '0',
        } as DeleteCategoryRequestDto)
      } catch (exception) {
        expect(exception).toBeInstanceOf(CustomError)
        expect(exception).toHaveProperty('statusCode', 404)
      }
    })
  })
})
