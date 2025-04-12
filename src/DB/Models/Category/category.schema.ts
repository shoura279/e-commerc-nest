import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import slugify from 'slugify';
export interface IImage {
  secure_url: string;
  public_id: string;
}

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: String,
    default: function () {
      return slugify(this.name);
    },
    unique: true,
  })
  slug: string;

  @Prop({ type: { secure_url: String, public_id: String } })
  image: IImage;

  @Prop({ type: String })
  folderId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
}

export const categorySchema = SchemaFactory.createForClass(Category);

export type TCategory = HydratedDocument<Category> & Document;
