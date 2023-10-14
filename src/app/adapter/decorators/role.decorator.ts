import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../constants/user_roles.constant';

export const RoleAllowed = (...role: UserRoles[]) => SetMetadata('roles', role);
