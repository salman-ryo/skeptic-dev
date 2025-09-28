// app/api/collections/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Collection } from '@/models/v2/SavedCollection';
import { withAuth, createApiResponse } from '@/lib/v2/middleware/auth';
import { handleApiError, ApiError } from '@/lib/v2/api/errorHandler';
import { hasPermission } from '@/lib/v2/rbac/permissions';

// GET /api/collections - Get user's collections
export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await connectToDatabase();
    
    if (!hasPermission(user.role, 'collections', 'canRead')) {
      throw new ApiError('Insufficient permissions to read collections', 403);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const [collections, total] = await Promise.all([
      Collection.find({ user: user._id })
        .populate({
          path: 'blog',
          select: 'title description slug author tags views createdAt',
          populate: {
            path: 'author',
            select: 'name email image'
          }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Collection.countDocuments({ user: user._id })
    ]);

    return createApiResponse(true, {
      collections,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
});

// POST /api/collections - Add blog to collection
export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await connectToDatabase();
    
    if (!hasPermission(user.role, 'collections', 'canCreate')) {
      throw new ApiError('Insufficient permissions to add to collections', 403);
    }

    const body = await request.json();
    const { blogId } = body;

    if (!blogId) {
      throw new ApiError('Blog ID is required', 400);
    }

    const existingCollection = await Collection.findOne({
      user: user._id,
      blog: blogId
    });

    if (existingCollection) {
      throw new ApiError('Blog is already in your collection', 409);
    }

    const collection = await Collection.create({
      user: user._id,
      blog: blogId
    });

    await collection.populate({
      path: 'blog',
      select: 'title description slug author tags views createdAt',
      populate: {
        path: 'author',
        select: 'name email image'
      }
    });

    return createApiResponse(true, collection, 'Blog added to collection successfully');
  } catch (error) {
    return handleApiError(error);
  }
});
