import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'

import { AxiosResponse } from 'axios'

import { CategoryService } from '../../../modules/category/category.service'
import { CategoryServiceHelper } from 'src/modules/category/category.service.helper'
import { DeleteCategoryRequestDto, GetCategoryListRequestDto, UpdateCategoryRequestDto } from 'src/modules/category/models/category.request'
import { GetCategoryListResponseDto, UpdateCategoryResponseDto } from 'src/modules/category/models/category.response'
import {
  mockCategoryListRawData,
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
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  test('when response is not empty then successfully return category list data', async () => {
    const expectedResult: GetCategoryListResponseDto[] =
      mockCategoryListResponse
    const result: AxiosResponse = {
      data: mockCategoryListRawData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))
    jest
      .spyOn(categoryServiceHelper, 'mapCategoryListResponse')
      .mockReturnValueOnce(expectedResult)
    const actualResult = await categoryService.getCategoryList(
      {} as GetCategoryListRequestDto
    )
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

    const actualResult = await categoryService.getCategoryList(
      {} as GetCategoryListRequestDto
    )
    expect(actualResult).toEqual([])
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
        id: '61baed559f389f44566df39d',
        nameEn: 'Electronics 2',
        nameTh: 'อุปกรณ์อิเล็กทรอนิกส์ 2',
        status: 'ACTIVE',
        parentId: '',
        group: 'PRODUCT'
      }
      const result: AxiosResponse = {
        data: mockUpdatedCategoryData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }
      jest.spyOn(httpService, 'put').mockReturnValueOnce(of(result))
      try {
        const actualResult = await categoryService.updateCategory(
          inputData
        )
        expect(actualResult).toEqual(mockUpdatedCategoryData)
      } catch (exception) {
        expect(exception).toBeInstanceOf(CustomError)
        expect(exception).toHaveProperty('statusCode', 404)
      }
    })
  })
  
})
