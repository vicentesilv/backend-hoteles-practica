import { SetMetadata } from '@nestjs/common';
import { UserRol } from 'src/user/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRol[]) => SetMetadata(ROLES_KEY, roles);
