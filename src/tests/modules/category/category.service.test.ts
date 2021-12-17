import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'

import { AxiosResponse } from 'axios'

import { CategoryService } from '../../../modules/category/category.service'
import { CategoryServiceHelper } from 'src/modules/category/category.service.helper'
import {
  GetCategoryListResponseDto,
  UpdateCategoryResponseDto,
} from 'src/modules/category/models/category.response'
import {
  CreateCategoryRequestDto,
  GetCategoryByIdRequestDto,
  DeleteCategoryRequestDto,
  GetCategoryListRequestDto,
  UpdateCategoryRequestDto,
} from 'src/modules/category/models/category.request'
import {
  mockCategoryListResponse,
  mockUpdatedCategoryData,
} from 'src/tests/mocks/category.service.mock'
import CustomError from 'src/utilities/customError'

jest.mock('src/utilities/logger')

describe('For CategoryService', () => {
  let httpService: HttpService
  let categoryService: CategoryService
  let categoryServiceHelper: CategoryServiceHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, CategoryServiceHelper],
      imports: [HttpModule],
    }).compile()

    httpService = module.get<HttpService>(HttpService)
    categoryService = module.get<CategoryService>(CategoryService)
    categoryServiceHelper = module.get<CategoryServiceHelper>(
      CategoryServiceHelper
    )

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

  test('when response is not empty then successfully return category list data', async () => {
    const expectedResult: GetCategoryListResponseDto[] =
      mockCategoryListResponse
    const result: AxiosResponse = {
      data: mockCategoryListResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))
    jest
      .spyOn(categoryServiceHelper, 'mapCategoryListResponse')
      .mockReturnValueOnce(expectedResult)
    const actualResult = await categoryService.getCategoryList()
    expect(actualResult).toEqual(mockCategoryListResponse)
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
    jest
      .spyOn(categoryServiceHelper, 'mapCategoryListResponse')
      .mockReturnValueOnce([])

    const actualResult = await categoryService.getCategoryList()
    expect(actualResult).toEqual([])
  })

  //------------- create category ----------------
  describe('For createCategory method', () => {
    test('when create category is successful then return create data in mock data list', async () => {
      const mockCreateCategory: CreateCategoryRequestDto = {
        parentId: '11111',
        nameEn: 'General',
        nameTh: 'ทั่วไป',
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

  describe('For getCategoryById method', () => {
    test('when request id is match then return data', async () => {
      const expectedResult: GetCategoryListResponseDto =
        mockCategoryListResponse[0]
      const result: AxiosResponse = {
        data: expectedResult,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))

      const actualResult = await categoryService.getCategoryById({
        id: expectedResult.id,
      } as GetCategoryByIdRequestDto)

      expect(actualResult).toEqual(expectedResult)
    })

    test('when request id is not match then throw 404', async () => {
      const result: AxiosResponse = {
        data: {},
        status: 404,
        statusText: 'Not found',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))

      try {
        await categoryService.getCategoryById({
          id: '0',
        } as GetCategoryByIdRequestDto)
      } catch (exception) {
        expect(exception).toBeInstanceOf(CustomError)
        expect(exception).toHaveProperty('statusCode', 404)
      }
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

    test('when request id is not match then throw error 404', async () => {
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

  describe('For updateCategory method', () => {
    test('when response is not empty then successfully return updated category data', async () => {
      const inputData: UpdateCategoryRequestDto = {
        id: '1a111a1aaaa111a111111111',
        nameEn: 'Electronics 2',
        nameTh: 'อุปกรณ์อิเล็กทรอนิกส์ 2',
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
      const actualResult: UpdateCategoryResponseDto =
        await categoryService.updateCategory(inputData)
      
      expect(actualResult).toEqual(mockUpdatedCategoryData)
      
    })
  })
})
