import { DBService } from 'src/DB/db.service';
import { TCategory } from './category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends DBService<TCategory> {
  constructor(@InjectModel('Category') categoryModel: Model<TCategory>) {
    super(categoryModel);
  }
}
