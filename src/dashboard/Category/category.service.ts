import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { CategoryRepository, TCategory } from 'src/DB/Models/Category';
import { TUser } from 'src/DB';
import { Types } from 'mongoose';
import { CloudService } from 'src/common/Services/cloud.service';
import slugify from 'slugify';
import { Request } from 'express';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly cloudService: CloudService,
  ) {}

  async getOne(id: Types.ObjectId) {
    return await this.categoryRepository.findOne({
      _id: id,
    });
  }

  async create(createCategoryDTO: CreateCategoryDTO, user: TUser) {
    const { name } = createCategoryDTO;
    const categoryExist = await this.categoryRepository.findOne({ name });
    if (categoryExist) throw new ConflictException('category already exist');
    // prepare data
    const category = {
      name,
      createdBy: user._id as Types.ObjectId,
      image: {
        secure_url: createCategoryDTO.image['secure_url'],
        public_id: createCategoryDTO.image['public_id'],
      },
      folderId: createCategoryDTO.image['folderId'],
    };
    const createdCategory = await this.categoryRepository.create(category);
    return createdCategory;
  }

  async update(
    id: Types.ObjectId,
    updateCategoryDTO: UpdateCategoryDTO,
    req: Request,
  ) {
    const { name } = updateCategoryDTO;
    const { file } = req;
    console.log({ id });

    const categoryExist = await this.getOne(id);
    if (!categoryExist) throw new NotFoundException('category not found');
    if (name) {
      const nameExist = await this.categoryRepository.findOne({ name });
      if (nameExist) throw new ConflictException('name already exist');
      categoryExist.name = name;
      categoryExist.slug = slugify(name);
    }
    if (file) {
      const { secure_url } = await this.cloudService.uploadFile({
        path: file.path,
        public_id: categoryExist.image.public_id,
      });
      categoryExist.image.secure_url = secure_url;
    }
    categoryExist.updatedBy = req.user._id;
    return await categoryExist.save();
  }
}
