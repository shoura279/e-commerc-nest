import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartRepository } from 'src/DB/Models/cart/cart.repository';
import { ProductRepository } from 'src/DB/Models/Product/product.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async addToCart(req: any) {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const product = await this.productRepository.findOne({
      _id: productId,
      stock: {
        $gte: quantity,
      },
    });
    if (!product) throw new NotFoundException('product not found');
    const cart = await this.cartRepository.findOne({ userId });
    if (!cart) {
      const newCart = await this.cartRepository.create({
        userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
      return newCart;
    }
    const productExist = cart.products.find((product) =>
      product.productId.equals(productId),
    );
    if (productExist) {
      throw new BadRequestException('product already exists in cart');
    }
    cart.products.push({
      productId,
      quantity,
    });
    await cart.save();
    return cart;
  }

  async getCart(req: any) {
    const userId = req.user._id;
    const cart = await this.cartRepository.findOne({ userId }, [
      {
        path: 'products.productId',
        select: 'title price discount finalPrice stock images slug',
      },
    ]);
    const products = cart?.products;
    console.log({ products });

    let totalPrice = 0;
    products?.map((product) => {
      totalPrice += product.quantity * product.productId['finalPrice'];
    });
    return { cart, totalPrice };
  }
}
