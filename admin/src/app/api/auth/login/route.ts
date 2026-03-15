import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '@/src/lib/api-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = await api.post('/sessions', body);

    const token = payload?.token ?? payload?.access_token ?? null;
    const user = payload?.user ?? payload?.data ?? null;

    if (!token) {
      return NextResponse.json({ error: 'No token returned from auth provider' }, { status: 500 });
    }

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
      const res = NextResponse.json({ user });
      res.headers.append('Set-Cookie', `jwt=${encodeURIComponent(String(token))}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`);
      return res;
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    const message = err?.payload?.message || err?.message || 'Login failed';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
