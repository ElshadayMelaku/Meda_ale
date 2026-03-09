import { cookies } from 'next/headers';
import api from './api-client';
import type { Session } from '../types/models';
import { resolveRolePermissions } from './permissions';

const ME_ENDPOINT = process.env.RAILS_ME_ENDPOINT || '/me';

export async function getSession(): Promise<Session | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ck = await cookies();
    const get = (ck as any)?.get;
    const tokenCookie = typeof get === 'function' ? get.call(ck, 'jwt') || get.call(ck, 'access_token') : null;
    const token = tokenCookie?.value ?? null;

    // If no token is present, allow a development fallback so the admin UI
    // can be developed without the Rails backend. Enable by setting
    // NEXT_PUBLIC_FAKE_AUTH=true in admin/.env.local or when NODE_ENV !== 'production'.
    const allowFake = (process.env.NEXT_PUBLIC_FAKE_AUTH === 'true') || (process.env.FAKE_AUTH === 'true') || (process.env.NODE_ENV !== 'production');
    if (!token) {
      if (allowFake) {
        // Return a small fake session (no token) for server-side guards.
        return {
          token: null,
          user: {
            id: 1,
            role_id: 4,
            full_name: 'Dev User (server-fallback)',
            phone_number: '0000000000',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          permissions: resolveRolePermissions(4),
        } as Session;
      }
      return null;
    }

    // If we have a token but it's a dev-token (set by /api/auth/dev-login),
    // return a fake session instead of calling the external API.
    if (allowFake && typeof token === 'string' && token.startsWith('dev-')) {
      return {
        token,
        user: {
          id: 999999,
          role_id: 4,
          full_name: 'Dev User (dev-token)',
          phone_number: '0000000000',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        permissions: resolveRolePermissions('SUPER_ADMIN'),
      } as Session;
    }

    // Fetch the current user from the Rails API (adjust endpoint as needed)
  const payload = await api.get(ME_ENDPOINT, { token });
  // payload may be the user object or { user, permissions }
  const user = payload?.user ?? payload ?? null;
  const perms = payload?.permissions ?? resolveRolePermissions(user?.role_id);
  return { token, user, permissions: perms } as Session;
  } catch (e) {
    return null;
  }
}
