import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cartModel } from 'src/DB/Models/cart/cart.model';
import { ProductModel } from 'src/DB/Models/Product/product.model';
import { ProductRepository } from 'src/DB/Models/Product/product.repository';
import { CartRepository } from 'src/DB/Models/cart/cart.repository';

@Module({
  imports: [cartModel, ProductModel],
  controllers: [CartController],
  providers: [CartService,ProductRepository,CartRepository]
})
export class CartModule {}
