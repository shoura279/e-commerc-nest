import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/common/Decorators/auth.decorator';
import { UserRoles } from 'src/common/enums';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/Utils/multer';
import { CloudInterceptor } from 'src/common/interceptor/cloud.interceptor';
import { CreateProductDTO } from './dto';
import { Request } from 'express';

@Controller('seller/product')
@Auth(UserRoles.SELLER)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 3, multerOptions()))
  async addProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDTO: CreateProductDTO,
    @Req() req: Request,
  ) {
    const product = await this.productService.create(
      createProductDTO,
      files,
      req,
    );
    return { data: product };
  }
}
