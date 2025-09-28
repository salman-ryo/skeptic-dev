// lib/rbac/permissions.ts
import { UserRole, RolePermissions } from '@/lib/types/api';
import { ROLE_PERMISSION_MAP } from './rolePermissionsMap';

const {CR, CRU, CRUD,CRUDA, R, Nil} = ROLE_PERMISSION_MAP;

export const ROLE_PERMISSIONS: Record<UserRole, {
  blogs: RolePermissions;
  collections: RolePermissions;
  users: RolePermissions;
}> = {
  user: {
    blogs: R,
    collections: CRUD,
    users: Nil
  }, 
  author: {
    blogs: CRUD,
    collections: CRUD,
    users: Nil
  },
  admin: {
    blogs: CRUDA,
    collections: CRUDA,
    users: CRUDA
  }
};

export function hasPermission(
  userRole: UserRole,
  resource: keyof typeof ROLE_PERMISSIONS.user,
  action: keyof RolePermissions
): boolean {
  const permissions = ROLE_PERMISSIONS[userRole][resource];
  return permissions[action] || false;
}

export function canManageResource(userRole: UserRole, resource: keyof typeof ROLE_PERMISSIONS.user): boolean {
  return ROLE_PERMISSIONS[userRole][resource].canManageAll || false;
}
