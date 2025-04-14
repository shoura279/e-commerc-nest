import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from 'src/common/Decorators/auth.decorator';
import { UserRoles } from 'src/common/enums';

@Controller('user/cart')
@Auth(UserRoles.USER)
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Post()
    async addToCart(@Req() req: any) {
        return await this.cartService.addToCart(req);
    }

    @Get()
    async getCart(@Req() req: any) {
        return await this.cartService.getCart(req);
    }
}
