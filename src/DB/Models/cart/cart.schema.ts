import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  Document,
  HydratedDocument,
  SchemaTypes,
  Types,
} from 'mongoose';

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
  @Prop({
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  })
  products: { productId: mongoose.Types.ObjectId; quantity: number }[];
}

export const cartSchema = SchemaFactory.createForClass(Cart);

export type TCart = HydratedDocument<Cart> & Document;
