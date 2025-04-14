import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel, CategoryRepository } from 'src/DB/Models/Category';
import { CloudService } from 'src/common/Services/cloud.service';
import { ProductRepository } from 'src/DB/Models/Product/product.repository';
import { ProductModel } from 'src/DB/Models/Product/product.model';

@Module({
  imports: [CategoryModel, ProductModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository,CloudService,ProductRepository],
})
export class CategoryModule {}
