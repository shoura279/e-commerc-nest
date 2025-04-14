import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
interface IImage {
  secure_url: string;
  public_id: string;
  folderId: string;
}

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsObject()
  image: IImage;
}

export class UpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  name?: string;
}


export class DeleteCategoryDTO {
  @IsMongoId()
  id?: string;
}
