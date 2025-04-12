import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto';
import { ProductRepository } from 'src/DB/Models/Product/product.repository';
import { CategoryService } from 'src/dashboard/Category/category.service';
import { TProduct } from 'src/DB/Models/Product/product.schema';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}
  async create(
    createProductDTO: CreateProductDTO,
    files: Express.Multer.File[],
    req: Request,
  ) {
    const { title, description, price, discount, category, stock } =
      createProductDTO;
    const categoryExist = await this.categoryService.getOne(category);
    if (!categoryExist) throw new NotFoundException('category not found');
    const product: Partial<TProduct> = {
      title,
      price,
      stock,
      discount,
      description,
      category,
      createdBy: req.user._id,
    };
    return await this.productRepository.create(product);
  }
}
