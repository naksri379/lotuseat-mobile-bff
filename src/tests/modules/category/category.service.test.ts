import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'

import { AxiosResponse } from 'axios'

import { CategoryService } from '../../../modules/category/category.service'
import { CategoryServiceHelper } from 'src/modules/category/category.service.helper'
import { CreateCategoryRequestDto, GetCategoryListRequestDto } from 'src/modules/category/models/category.request'
import { GetCategoryListResponseDto } from 'src/modules/category/models/category.response'
import {
  mockCategoryListRawData,
  mockCategoryListResponse,
} from 'src/tests/mocks/category.service.mock'

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

  //------------- create category ----------------
  test('when create category is successful then return create data in mock data list', async () => {

    let mockCreateCategory = {
      id: "1a111a1aaaa111a111111111",
      projectId: "eat",
      en: "General",
      th: "ทั่วไป",
      status: "NoActivate",
      group: "PRODUCT",
      externalRef: "wemal_cat_001",
      parentExternalRef: "",
      batchId: "2020-10-25T10:02:111",
      source: "wemal"
    }

    const actualResult = await categoryService.createCategory(
      mockCreateCategory
    )
    expect(actualResult.pop().id).toEqual(mockCreateCategory.id) 
  })

  test('when create data is incorrect then return create data in mock data list', async () => {

    let mockCreateCategory = {
      id: "1a111a1aaaa111a111111111",
      projectId: "1a11a11a11a11111111aa111",
      en: "General",
      th: "ทั่วไป",
      status: "NoActivate",
      group: "PRODUCT",
      externalRef: "wemal_cat_001",
      parentExternalRef: "",
      batchId: "2020-10-25T10:02:111",
      source: "Meow"
    }

    const actualResult = await categoryService.createCategory(
      mockCreateCategory
    )
    expect(actualResult.pop().id).toEqual(mockCreateCategory.id) 
  })
})
