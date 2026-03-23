import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow the Mailjet validation file to pass without any middleware interference
  if (request.nextUrl.pathname === '/bd0a9b8cd1e44677a69dcf5e74e258cc.txt') {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
