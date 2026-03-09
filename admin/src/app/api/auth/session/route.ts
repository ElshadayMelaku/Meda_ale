import { NextResponse } from 'next/server';
import { getSession } from '@/src/lib/session';

export async function GET() {
  try {
    const s = await getSession();
    const user = s?.user ?? null;
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}
