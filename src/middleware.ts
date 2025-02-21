// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  // Retrieve token from NextAuth; ensure NEXTAUTH_SECRET is set in your env
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users away from /login and /signup.
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/blogs', origin));
  }

  // Protect pages that require any logged-in user.
  if (pathname === '/blogs/saved') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', origin));
    }
    return NextResponse.next();
  }

  // List of admin routes that require role 'admin' or 'author'
  const adminRestrictedPaths = [
    '/admin/new-blog',
    '/admin/blogs',
    '/admin/edit-blog'
  ];

  if (adminRestrictedPaths.includes(pathname)) {
    if (!token || (token.role !== 'admin' && token.role !== 'author')) {
      // For API routes, return a JSON 401 error.
      if (pathname.startsWith('/api')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // Otherwise, redirect unauthorized users to the homepage.
      return NextResponse.redirect(new URL('/', origin));
    }
    return NextResponse.next();
  }

  // For any other routes, continue as normal.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blogs/saved',
    '/admin/new-blog',
    '/admin/blogs',
    '/admin/edit-blog',
    '/login',
    '/signup',
    '/api/admin/new-blog',
    '/api/admin/blogs',
    '/api/admin/edit-blog',
  ],
};
