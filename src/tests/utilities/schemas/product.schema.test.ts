import CustomError from 'src/utilities/customError'
import { JoiValidationPipe } from 'src/middleware/pipes/joiValidation.pipe'
import { GetProductListRequestDto } from 'src/modules/product/models/product.request'
import { GET_PRODUCT_LIST_REQUEST_SCHEMA } from 'src/utilities/schemas/product.schema'
import { INVALID_PARAMS } from 'src/constants/errorConstant'

describe('For Validate GET_PRODUCT_LIST_REQUEST_SCHEMA', () => {
  let target: JoiValidationPipe
  let getProductListRequest: GetProductListRequestDto
  beforeEach(() => {
    target = new JoiValidationPipe(GET_PRODUCT_LIST_REQUEST_SCHEMA)
    getProductListRequest = {
      limit: 20,
      offset: 1,
    }
  })

  describe('For success case', () => {
    test.each([0, 1, 2, 10])(
      '[%o] when offset is valid then successfully return result without error field',
      async (value) => {
        getProductListRequest.offset = value
        const actualResult = await target.transform(
          <GetProductListRequestDto>getProductListRequest
        )
        expect(actualResult.error).toBeUndefined()
      }
    )

    test.each([1, 2, 10, 5])(
      '[%o] when limit is valid then successfully return result without error field',
      async (value) => {
        getProductListRequest.limit = value
        const actualResult = await target.transform(
          <GetProductListRequestDto>getProductListRequest
        )
        expect(actualResult.error).toBeUndefined()
      }
    )
  })

  describe('For offset failed cases', () => {
    test.each([
      [undefined, 'offset is required'],
      ['test', 'offset is not a number'],
      [-1, 'offset must over 0'],
    ])(
      '[%o] when offset is empty or undefined then return result with error field',
      async (value: any, expected) => {
        getProductListRequest.offset = value
        try {
          await target.transform(
            <GetProductListRequestDto>getProductListRequest
          )
          expect(true).toBe(false)
        } catch (error) {
          expect(error).toBeInstanceOf(CustomError)
          const customError = <CustomError>error
          expect(customError.statusCode).toBe(400)
          expect(customError.error).toBe(INVALID_PARAMS)
          expect(error.errorDescription).toBe(expected)
        }
      }
    )
  })

  describe('For limit failed cases', () => {
    test.each([
      [undefined, 'limit is required'],
      ['test', 'limit is not a number'],
      [0, 'limit must over 1'],
      [-1, 'limit must over 1'],
    ])(
      '[%o] when limit is string or undefined or number limit then return result with error field',
      async (value: any, expected) => {
        try {
          getProductListRequest.limit = value
          await target.transform(
            <GetProductListRequestDto>getProductListRequest
          )
          expect(true).toBe(false)
        } catch (error) {
          expect(error).toBeInstanceOf(CustomError)
          const customError = <CustomError>error
          expect(customError.statusCode).toBe(400)
          expect(customError.error).toBe(INVALID_PARAMS)
          expect(error.errorDescription).toBe(expected)
        }
      }
    )
  })
})
