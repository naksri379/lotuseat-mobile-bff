import { HttpModule, Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryServiceHelper } from './category.service.helper'

@Module({
  imports: [HttpModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryServiceHelper],
  exports: [CategoryService, CategoryServiceHelper],
})
export class CategoryModule {}
