// lib/api/errorHandler.ts
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types/api';

export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export function handleApiError(error: any): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: error.statusCode });
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    return NextResponse.json({
      success: false,
      error: Object.values(error.errors).map((e: any) => e.message).join(', ')
    }, { status: 400 });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return NextResponse.json({
      success: false,
      error: `${field} already exists`
    }, { status: 409 });
  }

  return NextResponse.json({
    success: false,
    error: 'Internal server error'
  }, { status: 500 });
}

export function validateObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
