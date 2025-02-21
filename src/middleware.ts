// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Retrieve token from NextAuth; ensure NEXTAUTH_SECRET is set in your env
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users away from /login and /signup.
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/blogs', req.url));
  }

  // Protect pages that require any logged-in user.
  if (pathname === '/blogs/saved') {
    if (!token) {
      // Redirect non-authenticated users to the login page (adjust URL as needed)
      return NextResponse.redirect(new URL('/login', req.url));
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
      // If this is an API request, return a JSON 401 error.
      if (pathname.startsWith('/api')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // Otherwise, redirect unauthorized users to the homepage (or another page)
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // For any other routes, continue as normal.
  return NextResponse.next();
}

// Specify which routes this middleware should run on.
export const config = {
  matcher: [
    '/blogs/saved',
    '/admin/new-blog',
    '/admin/blogs',
    '/admin/edit-blog',
    '/login',
    '/signup',
    // Optionally include API endpoints if needed.
    '/api/admin/new-blog',
    '/api/admin/blogs',
    '/api/admin/edit-blog',
  ],
};
