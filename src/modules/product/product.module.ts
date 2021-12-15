import { HttpModule, Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductServiceHelper } from './product.service.helper'

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService, ProductServiceHelper],
  exports: [ProductService, ProductServiceHelper],
})
export class ProductModule {}
