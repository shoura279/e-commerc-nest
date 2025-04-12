import { Global, Module } from '@nestjs/common';
import { UserModel, UserRepository } from '../DB';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from 'src/common';
import { JwtService } from '@nestjs/jwt';
@Global()
@Module({
  imports: [UserModel], // register user model and product model to auth module
  controllers: [AuthController],
  providers: [AuthService, UserRepository, TokenService, JwtService],
  exports: [UserRepository, TokenService, JwtService],
})
export class AuthModule {}
