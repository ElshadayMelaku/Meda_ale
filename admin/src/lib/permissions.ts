import type { Permission, RoleName } from '@/src/types/models';

export const ROLE_PERMISSIONS: Record<RoleName, Permission[]> = {
  SUPER_ADMIN: ['admin.*'],
  VENUE_ADMIN: ['venues.read', 'venues.manage', 'bookings.read', 'bookings.update'],
  STAFF: ['bookings.read', 'bookings.create', 'bookings.update'],
  CLIENT: ['bookings.read', 'bookings.create'],
};

export function resolveRolePermissions(roleIdOrName: number | RoleName | undefined): Permission[] {
  if (roleIdOrName == null) return [];
  // If a role name is passed, use it directly
  if (typeof roleIdOrName === 'string') {
    return ROLE_PERMISSIONS[roleIdOrName] ?? [];
  }
  // For numeric role ids, map common ids to names (this is app-specific).
  // By default we conservatively return an empty array.
  // You should replace this mapping with your server's role id -> name mapping.
  const mapping: Record<number, RoleName> = {
    1: 'CLIENT',
    2: 'STAFF',
    3: 'VENUE_ADMIN',
    4: 'SUPER_ADMIN',
  };
  const name = mapping[roleIdOrName];
  if (!name) return [];
  return ROLE_PERMISSIONS[name] ?? [];
}

export function hasPermission(perms: Permission[] | undefined, wanted: Permission) {
  if (!perms) return false;
  if (perms.includes('admin.*')) return true;
  return perms.includes(wanted);
}
