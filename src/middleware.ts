// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host = req.headers.get('host');
  const origin = `${proto}://${host}`;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 1. For login and signup pages:
  //    Redirect already authenticated users to '/blogs'
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/blogs', origin));
  }

  // 2. For UI routes that require any authenticated user:
  if (pathname === '/blogs/saved') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', origin));
    }
    return NextResponse.next();
  }

  // 3. For UI admin routes (non-API, any path starting with '/admin'):
  if (!pathname.startsWith('/api') && pathname.startsWith('/admin')) {
    if (!token || (token.role !== 'admin' && token.role !== 'author')) {
      return NextResponse.redirect(new URL('/', origin));
    }
    return NextResponse.next();
  }

  // 4. For API routes that require protection:
  //    These are any routes under /api/admin, /api/author, or /api/user.
  if (pathname.startsWith('/api')) {
    const protectedApiPrefixes = ['/api/admin', '/api/author', '/api/user'];
    if (protectedApiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      if (!token) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      // For /api/admin and /api/author, check that the token role is allowed.
      if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/author')) {
        if (token.role !== 'admin' && token.role !== 'author') {
          return new NextResponse(
            JSON.stringify({ error: 'Unauthorized' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      }
      // For /api/user, simply require that a token exists.
      return NextResponse.next();
    }
  }

  // 5. For all other routes, continue as normal.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/blogs/saved',
    '/admin/:path*',           // all admin UI routes
    '/api/admin/:path*',       // all API routes under /api/admin
    '/api/author/:path*',      // all API routes under /api/author
    '/api/user/:path*',        // all API routes under /api/user
  ],
};
