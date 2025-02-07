// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Only run this middleware on routes that start with /admin or /api/admin
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
    // Retrieve token from NextAuth; ensure you have NEXTAUTH_SECRET set in your env
    const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET });
    
    // Check if token exists and if the user has an 'admin' role.
    if (!token || token.role !== 'admin') {
      // Option 1: Redirect to an unauthorized page for pages
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // Option 2: For API routes, return a 401 response
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  return NextResponse.next();
}

// Specify which routes this middleware should run on.
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
