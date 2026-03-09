import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { resolveRolePermissions } from '@/src/lib/permissions';

/**
 * Dev-only endpoint that sets an HttpOnly cookie to emulate a real auth
 * provider during local UI development. Enabled when NEXT_PUBLIC_FAKE_AUTH=true
 * or when NODE_ENV !== 'production'.
 */
export async function POST(req: Request) {
  const allowFake = (process.env.NEXT_PUBLIC_FAKE_AUTH === 'true') || (process.env.FAKE_AUTH === 'true') || (process.env.NODE_ENV !== 'production');
  if (!allowFake) {
    return NextResponse.json({ error: 'Dev login disabled' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const phone = body?.phone_number ?? 'dev';

    // Generate a short-lived dev token (not secure) that server code will
    // recognise (starts with "dev-") to bypass external API calls.
    const token = `dev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Minimal fake user payload. Keep shape consistent with User type.
    const user = {
      id: 999999,
      role_id: 4,
      full_name: `Dev User (${phone})`,
      phone_number: String(phone),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

  const permissions = resolveRolePermissions('SUPER_ADMIN');

  // Set HttpOnly cookie so server-side code (getSession) can read it.
    // cookies() may be a thenable in some Next versions; await to be safe
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ck = await cookies();
    const set = (ck as any)?.set;
    if (typeof set === 'function') {
      set.call(ck, {
        name: 'jwt',
        value: String(token),
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });
    } else {
      const res = NextResponse.json({ user, token, permissions });
      res.headers.append('Set-Cookie', `jwt=${encodeURIComponent(String(token))}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`);
      return res;
    }

    return NextResponse.json({ user, token, permissions });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Dev login failed' }, { status: 500 });
  }
}
