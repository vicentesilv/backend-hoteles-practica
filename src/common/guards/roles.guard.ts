import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { UserRol } from 'src/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      Reflect.getMetadata(ROLES_KEY, context.getHandler()) ||
      Reflect.getMetadata(ROLES_KEY, context.getClass());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { rol?: UserRol } | undefined;

    if (!user?.rol) {
      return false;
    }

    return requiredRoles.includes(user.rol);
  }
}
