import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @Type(() => Types.ObjectId)
  @IsMongoId()
  category: Types.ObjectId;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  stock: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  discount: number;
}
