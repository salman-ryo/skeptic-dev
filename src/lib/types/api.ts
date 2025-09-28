// lib/types/api.ts
import { NextRequest } from 'next/server';
import { IUser } from '@/models/User';

export interface AuthenticatedRequest extends NextRequest {
  user?: IUser;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type UserRole = 'user' | 'author' | 'admin';

export interface RolePermissions {
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canManageAll?: boolean;
}

// lib/types/auth.ts
export interface JWTPayload {
  id: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
