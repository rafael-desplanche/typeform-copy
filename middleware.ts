import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/dashboard/login') {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('internal_auth')?.value;
  if (authCookie === '1') {
    return NextResponse.next();
  }

  const loginUrl = new URL('/dashboard/login', request.url);
  loginUrl.searchParams.set('next', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
