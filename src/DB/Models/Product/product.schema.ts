import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Category, IImage } from '../Category';
import slugify from 'slugify';
import { User } from '../User/user.schema';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true, trim: true })
  title: string;
  @Prop({
    type: String,
    default: function () {
      return slugify(this.title);
    },
    trim: true,
  })
  slug: string;

  @Prop({ type: String, trim: true })
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    default: function () {
      return this.createdBy;
    },
  })
  updatedBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, required: true })
  category: Types.ObjectId;
  // subcategory brand

  @Prop({ type: Number, required: true, min: 1 })
  price: number;

  @Prop({ type: Number, min: 0, max: 100 })
  discount: number;

  @Prop({
    type: Number,
    default: function () {
      return this.price - this.price * ((this.discount || 0) / 100);
    },
  })
  finalPrice: number;
  @Prop({ type: Number, min: 0, default: 1 })
  stock: number;

  @Prop({
    type: [{ secure_url: String, public_id: String }],
  })
  images: IImage[];

  @Prop({ type: String })
  folderId: string;
}
export const productSchema = SchemaFactory.createForClass(Product);

export type TProduct = HydratedDocument<Product> & Document;
