// app/api/admin/users/[id]/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { withRole, createApiResponse } from '@/lib/v2/middleware/auth';
import { handleApiError, ApiError, validateObjectId } from '@/lib/v2/api/errorHandler';

interface RouteParams {
  params: { id: string };
}

// PUT /api/admin/users/[id] - Update user role (admin only)
export const PUT = withRole(['admin'], async (request: NextRequest, user: any, { params }: RouteParams) => {
  try {
    await connectToDatabase();

    if (!validateObjectId(params.id)) {
      throw new ApiError('Invalid user ID', 400);
    }

    const body = await request.json();
    const { role } = body;

    if (!role || !['user', 'author', 'admin'].includes(role)) {
      throw new ApiError('Invalid role. Must be user, author, or admin', 400);
    }

    // Prevent admin from changing their own role
    if (params.id === user._id.toString()) {
      throw new ApiError('Cannot change your own role', 403);
    }

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) {
      throw new ApiError('User not found', 404);
    }

    return createApiResponse(true, updatedUser, 'User role updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
});

// DELETE /api/admin/users/[id] - Delete user (admin only)
export const DELETE = withRole(['admin'], async (request: NextRequest, user: any, { params }: RouteParams) => {
  try {
    await connectToDatabase();

    if (!validateObjectId(params.id)) {
      throw new ApiError('Invalid user ID', 400);
    }

    // Prevent admin from deleting themselves
    if (params.id === user._id.toString()) {
      throw new ApiError('Cannot delete your own account', 403);
    }

    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      throw new ApiError('User not found', 404);
    }

    return createApiResponse(true, null, 'User deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
});
