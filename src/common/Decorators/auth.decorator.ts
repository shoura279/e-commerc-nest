import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './role.decorator';
import { AuthGuard } from '../Guards';
import { RoleGuard } from '../Guards/role.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
}
Auth('user', 'admin'); // [] >> 'user','admin' >>
