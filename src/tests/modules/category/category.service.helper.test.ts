import { Test, TestingModule } from '@nestjs/testing'

import { CategoryServiceHelper } from 'src/modules/category/category.service.helper'
import {
  mockCategoryListRawData,
  mockCategoryListResponse,
} from 'src/tests/mocks/category.service.mock'

describe('CategoryServiceHelper', () => {
  let categoryServiceHelper: CategoryServiceHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryServiceHelper],
      imports: [],
    }).compile()

    categoryServiceHelper = module.get<CategoryServiceHelper>(
      CategoryServiceHelper
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('For success case', () => {
    test('when rawData is not empty then successfully return category list data', async () => {
      const actualResult = await categoryServiceHelper.mapCategoryListResponse(
        mockCategoryListRawData
      )
      expect(actualResult).toEqual(mockCategoryListResponse)
    })

    test.each([null, undefined])(
      'when rawData is [%o] empty then return empty data',
      async (value: any) => {
        const actualResult =
          await categoryServiceHelper.mapCategoryListResponse(value)
        expect(actualResult).toEqual([])
      }
    )
  })
})
