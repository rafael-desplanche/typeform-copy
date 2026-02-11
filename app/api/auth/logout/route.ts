import { NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.redirect(new URL('/dashboard/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  res.cookies.set(AUTH_COOKIE, '', { expires: new Date(0), path: '/' });
  return res;
}
