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
          id: category.Id,
          projectId: category.ProjectId,
          nameTh: category.Name?.Th,
          nameEn: category.Name?.En,
          status: category.Status,
          group: category.Group,
          externalRef: category.ExternalRef,
          parentExternalRef: category.ParentExternalRef,
          batchId: category.BatchId,
          source: category.Source,
        }
      })
    }

    return []
  }
}
