import { Injectable } from '@nestjs/common'
import { GetProductListResponseDto } from './models/product.response'
@Injectable()
export class ProductServiceHelper {
  mapProductListResponse = (
    productRawData = []
  ): GetProductListResponseDto[] => {
    if (productRawData && productRawData.length) {
      return productRawData.map((product) => {
        return {
          productId: product.ProductID,
          name: product.Name,
          quanity: product.Quanity,
          price: product.Price,
        }
      })
    }

    return []
  }
}
