import { getSession } from './session';
import { hasPermission } from './permissions';
import type { Permission } from '@/src/types/models';

export async function requirePermission(permission: Permission) {
  const s = await getSession();
  if (!s?.user) {
    throw new Response('Unauthorized', { status: 401 });
  }
  const perms = s.permissions ?? [];
  if (!hasPermission(perms, permission)) {
    throw new Response('Forbidden', { status: 403 });
  }
  return s;
}
