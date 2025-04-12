import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel, CategoryRepository } from 'src/DB/Models/Category';
import { CloudService } from 'src/common/Services/cloud.service';

@Module({
  imports: [CategoryModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository,CloudService],
})
export class CategoryModule {}
