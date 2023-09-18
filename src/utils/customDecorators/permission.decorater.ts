// decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/permission-action.enum';
export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
