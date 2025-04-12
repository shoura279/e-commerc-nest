import { DBService } from 'src/DB/db.service';
import { TProduct } from './product.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductRepository extends DBService<TProduct> {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<TProduct>,
  ) {
    super(productModel);
  }
}
