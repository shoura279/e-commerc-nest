import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
// class-transformer

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsStrongPassword()
  @IsNotEmpty()
  cPassword: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
