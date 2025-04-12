import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../Services';
import { UserRepository } from 'src/DB';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization?.startsWith('Hambozo')) {
      throw new UnauthorizedException('invalid bearer token');
    }
    // Hambozo token
    const token = authorization.split(' ')[1];
    const data = this.tokenService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.userRepository.findOne({ _id: data._id });
    if (!user) throw new NotFoundException('user not found');
    request.user = user;
    return true; // next()
  }
}
