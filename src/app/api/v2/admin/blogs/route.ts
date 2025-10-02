// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/v2/Blog';
import { createApiResponse, withRole } from '@/lib/v2/middleware/auth';
import { ApiError, handleApiError } from '@/lib/v2/api/errorHandler';
import { hasPermission } from '@/lib/v2/rbac/permissions';

// GET /api/blogs - Public route (can be accessed by anyone)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tags = searchParams.get('tags')?.split(',') || [];
    const author = searchParams.get('author');

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tags.length > 0 && tags[0] !== '') {
      query.tags = { $in: tags };
    }
    
    if (author) {
      query.author = author;
    }

    const skip = (page - 1) * limit;
    
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate('author', 'name email image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content'), // Don't return full content in list
      Blog.countDocuments(query)
    ]);

    return createApiResponse(true, {
      blogs,
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
}

// POST /api/blogs - Create new blog (authors and admins only)
export const POST = withRole(['author', 'admin'], async (request: NextRequest, user: any) => {
  try {
    await connectToDatabase();
    
    if (!hasPermission(user.role, 'blogs', 'canCreate')) {
      throw new ApiError('Insufficient permissions to create blogs', 403);
    }

    const body = await request.json();
    const { title, description, content, tags } = body;

    if (!title || !content) {
      throw new ApiError('Title and content are required', 400);
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      tags: tags || [],
      author: user._id
    });

    await blog.populate('author', 'name email image');

    return createApiResponse(true, blog, 'Blog created successfully');
  } catch (error) {
    return handleApiError(error);
  }
});
