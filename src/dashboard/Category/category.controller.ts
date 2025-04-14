import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/common/Decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, DeleteCategoryDTO, UpdateCategoryDTO } from './dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerOptions } from 'src/common/Utils/multer';
import { CloudInterceptor } from 'src/common/interceptor/cloud.interceptor';
import { Types } from 'mongoose';

@Controller('dashboard/category')
@Auth('admin')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions()), CloudInterceptor)
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const category = await this.categoryService.create(
      createCategoryDTO,
      req['user'],
    );
    return {
      success: true,
      message: 'category created successfully',
      data: category,
    };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions()))
  async update(
    @Req() req: Request,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('id') id: Types.ObjectId,
  ) {
    const category = await this.categoryService.update(
      id,
      updateCategoryDTO,
      req,
    );
    return { success: true, data: category };
  }


  @Delete()
  async delete(@Body() body: DeleteCategoryDTO) {
    return await this.categoryService.deleteCategory(body);
  }
}
