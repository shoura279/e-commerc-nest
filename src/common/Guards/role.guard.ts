import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getClass());

    const request = context.switchToHttp().getRequest();
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException('not allowed for you');
    }
    return true;
  }
}
