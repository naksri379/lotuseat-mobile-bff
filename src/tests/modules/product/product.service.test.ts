import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/common'
import { ProductService } from 'src/modules/product/product.service'
import { ProductServiceHelper } from 'src/modules/product/product.service.helper'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import {
  mockProductListRawData,
  mockProductListResponse,
} from 'src/tests/mocks/product.service.mock'
import { GetProductListRequestDto } from 'src/modules/product/models/product.request'
import { GetProductListResponseDto } from 'src/modules/product/models/product.response'

jest.mock('src/utilities/logger')

describe('For ProductService', () => {
  let httpService: HttpService
  let productService: ProductService
  let productServiceHelper: ProductServiceHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductServiceHelper],
      imports: [HttpModule],
    }).compile()

    httpService = module.get<HttpService>(HttpService)
    productService = module.get<ProductService>(ProductService)
    productServiceHelper =
      module.get<ProductServiceHelper>(ProductServiceHelper)
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  test('when response is not empty then successfully return product list data', async () => {
    const expectedResult: GetProductListResponseDto[] = mockProductListResponse
    const result: AxiosResponse = {
      data: mockProductListRawData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(result))
    jest
      .spyOn(productServiceHelper, 'mapProductListResponse')
      .mockReturnValueOnce(expectedResult)
    const actualResult = await productService.getProductList(
      {} as GetProductListRequestDto
    )
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
    jest
      .spyOn(productServiceHelper, 'mapProductListResponse')
      .mockReturnValueOnce([])

    const actualResult = await productService.getProductList(
      {} as GetProductListRequestDto
    )
    expect(actualResult).toEqual([])
  })
})
