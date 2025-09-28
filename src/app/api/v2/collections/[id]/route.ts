// app/api/collections/[id]/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Collection } from '@/models/v2/SavedCollection';
import { withResourceOwnership, createApiResponse } from '@/lib/v2/middleware/auth';
import { handleApiError, ApiError, validateObjectId } from '@/lib/v2/api/errorHandler';
import { hasPermission } from '@/lib/v2/rbac/permissions';

interface RouteParams {
  params: { id: string };
}

// Resource ownership checker for collections
async function getCollectionUserId(request: NextRequest, { params }: RouteParams): Promise<string> {
  await connectToDatabase();
  const collection = await Collection.findById(params.id).select('user');
  if (!collection) throw new ApiError('Collection item not found', 404);
  return collection.user.toString();
}

// DELETE /api/collections/[id] - Remove from collection
export const DELETE = withResourceOwnership(
  getCollectionUserId,
  async (request: NextRequest, user: any, { params }: RouteParams) => {
    try {
      await connectToDatabase();

      if (!validateObjectId(params.id)) {
        throw new ApiError('Invalid collection ID', 400);
      }

      if (!hasPermission(user.role, 'collections', 'canDelete')) {
        throw new ApiError('Insufficient permissions to remove from collections', 403);
      }

      const collection = await Collection.findByIdAndDelete(params.id);

      if (!collection) {
        throw new ApiError('Collection item not found', 404);
      }

      return createApiResponse(true, null, 'Removed from collection successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
);
