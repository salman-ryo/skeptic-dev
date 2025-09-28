// lib/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { verifyToken } from '@/lib/tokens';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { AuthenticatedRequest, UserRole, ApiResponse, JWTPayload } from '@/lib/types/api';
import { authOptions } from '@/services/auth';

export async function authenticate(request: NextRequest): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  try {
    await connectToDatabase();
    
    // Try NextAuth session first
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
      const user = await User.findById(session.user.id);
      if (user) {
        return { success: true, user };
      }
    }

    // Fallback to JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return { success: false, error: 'No valid authentication found' };
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token) as JWTPayload;
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success,
    data,
    message,
    error
  }, {
    status: success ? 200 : 400
  });
}

// Higher-order function for route protection
export function withAuth<T extends any[]>(
  handler: (request: NextRequest, user: any, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const authResult = await authenticate(request);
    
    if (!authResult.success || !authResult.user) {
      return createApiResponse(false, null, undefined, authResult.error || 'Authentication required');
    }

    return handler(request, authResult.user, ...args);
  };
}

// Higher-order function for role-based authorization
export function withRole<T extends any[]>(
  requiredRoles: UserRole[],
  handler: (request: NextRequest, user: any, ...args: T) => Promise<NextResponse>
) {
  return withAuth<T>(async (request: NextRequest, user: any, ...args: T) => {
    if (!requiredRoles.includes(user.role)) {
      return createApiResponse(false, null, undefined, 'Insufficient permissions');
    }
    
    return handler(request, user, ...args);
  });
}

// Resource ownership check
export function withResourceOwnership<T extends any[]>(
  getResourceUserId: (request: NextRequest, ...args: T) => Promise<string>,
  handler: (request: NextRequest, user: any, ...args: T) => Promise<NextResponse>
) {
  return withAuth<T>(async (request: NextRequest, user: any, ...args: T) => {
    try {
      // Admin can access all resources
      if (user.role === 'admin') {
        return handler(request, user, ...args);
      }

      const resourceUserId = await getResourceUserId(request, ...args);
      
      if (user._id.toString() !== resourceUserId) {
        return createApiResponse(false, null, undefined, 'Access denied to this resource');
      }

      return handler(request, user, ...args);
    } catch (error) {
      return createApiResponse(false, null, undefined, 'Error checking resource ownership');
    }
  });
}
