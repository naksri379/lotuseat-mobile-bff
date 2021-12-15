import { Injectable } from '@nestjs/common'
import { GetCategoryListResponseDto } from './models/category.response'
@Injectable()
export class CategoryServiceHelper {
  mapCategoryListResponse = (
    categoryRawData = []
  ): GetCategoryListResponseDto[] => {
    if (categoryRawData && categoryRawData.length) {
      return categoryRawData.map((category) => {
        return {
          categoryId: category.CategoryID,
          name: category.Name,
          quanity: category.Quanity,
          price: category.Price,
        }
      })
    }

    return []
  }
}
