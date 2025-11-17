
import { NextResponse } from 'next/server';

export function proxy(request) {
  const accessToken = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  console.log('Proxy running for:', pathname);


  if (pathname.startsWith('/dashboard') && !accessToken) {
    console.log('Redirecting to login - no access token');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

 
  if (pathname.startsWith('/auth/login') && accessToken) {
    console.log('Redirecting to dashboard - user already authenticated');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login'
  ],
};