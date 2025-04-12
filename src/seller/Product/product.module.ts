import { Module } from '@nestjs/common';
import { ProductModel } from 'src/DB/Models/Product/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/DB/Models/Product/product.repository';
import { CategoryModel, CategoryRepository } from 'src/DB/Models/Category';
import { CategoryService } from 'src/dashboard/Category/category.service';
import { CloudService } from 'src/common/Services/cloud.service';

@Module({
  imports: [ProductModel, CategoryModel],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CategoryRepository,
    CategoryService,
    CloudService,
  ],
})
export class ProductModule {}
