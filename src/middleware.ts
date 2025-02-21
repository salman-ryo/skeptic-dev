// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host = req.headers.get('host');
  const origin = `${proto}://${host}`;

  // 1. Allow all public API routes to pass through unprotected.
  if (pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // 2. Retrieve token for protected routes.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 3. Redirect already logged-in users away from /login or /signup.
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/blogs', origin));
  }

  // 4. Protect pages that require a logged-in user.
  if (pathname === '/blogs/saved' && !token) {
    return NextResponse.redirect(new URL('/login', origin));
  }

  // 5. For UI admin routes (e.g., any path starting with '/admin')
  if (!pathname.startsWith('/api') && pathname.startsWith('/admin')) {
    if (!token || (token.role !== 'admin' && token.role !== 'author')) {
      return NextResponse.redirect(new URL('/', origin));
    }
    return NextResponse.next();
  }

  // 6. For protected API routes.
  if (pathname.startsWith('/api')) {
    const protectedApiPrefixes = ['/api/admin', '/api/author', '/api/user'];
    if (protectedApiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      if (!token) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/author')) {
        if (token.role !== 'admin' && token.role !== 'author') {
          return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
      return NextResponse.next();
    }
  }

  // 7. For any other routes, continue as normal.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/blogs/saved',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/author/:path*',
    '/api/user/:path*',
    // Note: We deliberately do not match '/api/public/:path*' so they remain unprotected.
  ],
};
