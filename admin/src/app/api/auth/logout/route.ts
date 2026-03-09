import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Clear the jwt/access_token cookie set by the login route.
  // cookies() may be a thenable in some Next versions; await to be safe
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ck = await cookies();
  const set = (ck as any)?.set;
  if (typeof set === 'function') {
    // Setting empty value with maxAge 0 to delete the cookie
    set.call(ck, {
      name: 'jwt',
      value: '',
      path: '/',
      httpOnly: true,
      maxAge: 0,
      sameSite: 'lax',
    });
    try {
      set.call(ck, {
        name: 'access_token',
        value: '',
        path: '/',
        httpOnly: true,
        maxAge: 0,
        sameSite: 'lax',
      });
    } catch (e) {
      // ignore if not present
    }
    return NextResponse.json({ ok: true });
  }

  const res = NextResponse.json({ ok: true });
  res.headers.append('Set-Cookie', `jwt=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
  res.headers.append('Set-Cookie', `access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
  return res;
}
