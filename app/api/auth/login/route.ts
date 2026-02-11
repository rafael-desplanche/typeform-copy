import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, getInternalPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== getInternalPassword()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, '1', { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
