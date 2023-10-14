import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../constants/user_roles.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.getAllAndMerge<UserRoles[]>('roles', [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    if (roles && roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && !user.role) {
      return false;
    }

    const hasRole = () => roles.some((i) => i === user.role);

    return user && hasRole();
  }
}
