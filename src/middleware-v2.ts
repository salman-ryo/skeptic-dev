// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host = req.headers.get('host');
  const origin = `${proto}://${host}`;

  // 1. Allow all public API routes to pass through unprotected.
  if (pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // 2. Allow public blog reading (GET requests to blogs) - no token needed
  if (pathname.startsWith('/api/blogs') && method === 'GET') {
    return NextResponse.next();
  }

  // 3. Retrieve token for protected routes.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 4. Redirect already logged-in users away from /login or /signup.
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/blogs', origin));
  }

  // 5. Protect pages that require a logged-in user.
  if ((pathname === '/blogs/saved' || pathname === '/dashboard' || pathname.startsWith('/dashboard/')) && !token) {
    return NextResponse.redirect(new URL('/login', origin));
  }

  // 6. For UI admin routes (e.g., any path starting with '/admin')
  if (!pathname.startsWith('/api') && pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', origin));
    }
    return NextResponse.next();
  }

  // 7. For protected API routes.
  if (pathname.startsWith('/api')) {
    // 7a. Admin API routes - require admin role
    if (pathname.startsWith('/api/admin')) {
      if (!token) {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Authentication required' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (token.role !== 'admin') {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Admin access required' 
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return NextResponse.next();
    }

    // 7b. Blog modification routes - require author or admin
    if (pathname.startsWith('/api/blogs') && ['POST', 'PUT', 'DELETE'].includes(method)) {
      if (!token) {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Authentication required' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!['author', 'admin'].includes(token.role as string)) {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Author or admin access required' 
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return NextResponse.next();
    }

    // 7c. Collection routes - require any authenticated user
    if (pathname.startsWith('/api/collections')) {
      if (!token) {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Authentication required' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return NextResponse.next();
    }

    // 7d. Legacy protected API routes (keeping your existing structure)
    const protectedApiPrefixes = ['/api/author', '/api/user'];
    if (protectedApiPrefixes.some(prefix => pathname.startsWith(prefix))) {
      if (!token) {
        return new NextResponse(JSON.stringify({ 
          success: false, 
          error: 'Authentication required' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (pathname.startsWith('/api/author')) {
        if (!['admin', 'author'].includes(token.role as string)) {
          return new NextResponse(JSON.stringify({ 
            success: false, 
            error: 'Author or admin access required' 
          }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
      return NextResponse.next();
    }
  }

  // 8. For any other routes, continue as normal.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/blogs/saved',
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/author/:path*',
    '/api/user/:path*',
    '/api/blogs/:path*', // Added to handle blog routes
    '/api/collections/:path*', // Added to handle collection routes
    // Note: We deliberately do not match '/api/public/:path*' so they remain unprotected.
  ],
};
