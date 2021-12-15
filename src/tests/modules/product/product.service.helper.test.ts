import { Test, TestingModule } from '@nestjs/testing'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import {
  mockProductListRawData,
  mockProductListResponse,
} from 'src/tests/mocks/product.service.mock'

describe('ProductServiceHelper', () => {
  let productServiceHelper: ProductServiceHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductServiceHelper],
      imports: [],
    }).compile()

    productServiceHelper =
      module.get<ProductServiceHelper>(ProductServiceHelper)
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('For success case', () => {
    test('when rawData is not empty then successfully return product list data', async () => {
      const actualResult = await productServiceHelper.mapProductListResponse(
        mockProductListRawData
      )
      expect(actualResult).toEqual(mockProductListResponse)
    })

    test.each([null, undefined])(
      'when rawData is [%o] empty then return empty data',
      async (value: any) => {
        const actualResult = await productServiceHelper.mapProductListResponse(
          value
        )
        expect(actualResult).toEqual([])
      }
    )
  })
})
