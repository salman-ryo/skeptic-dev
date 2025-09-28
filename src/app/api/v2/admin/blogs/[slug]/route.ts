// app/api/blogs/[slug]/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { ApiError, handleApiError } from '@/lib/v2/api/errorHandler';
import { createApiResponse, withResourceOwnership } from '@/lib/v2/middleware/auth';
import { hasPermission } from '@/lib/v2/rbac/permissions';

interface RouteParams {
  params: { slug: string | Promise<string> };
}

// Helper to safely resolve params (works whether params is a value or a promise)
async function resolveSlug(params: any): Promise<string> {
  const resolved = (await params) as any;
  console.log("🚀 ~ resolveSlug ~ resolved:", resolved)
  // In some contexts `params` might be `{ slug: '...' }`, in others it might be directly the slug.
  const slug = resolved?.slug ?? resolved;
  if (!slug || typeof slug !== 'string') {
    throw new ApiError('Missing or invalid slug parameter', 400);
  }
  return slug;
}

// GET /api/blogs/[slug] - Fetch blog (no side-effects)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const slug = await resolveSlug(params);
    console.log("🚀 ~ GET ~ slug:", slug)

    const blog = await Blog.findOne({ slug }).populate('author', 'name email image');

    if (!blog) {
      throw new ApiError('Blog not found', 404);
    }

    return createApiResponse(true, blog);
  } catch (error) {
    return handleApiError(error);
  }
}

// Resource ownership checker for blogs
async function getBlogAuthorId(request: NextRequest, { params }: RouteParams): Promise<string> {
  await connectToDatabase();
  const slug = await resolveSlug(params);

  const blog = await Blog.findOne({ slug }).select('author');
  if (!blog) throw new ApiError('Blog not found', 404);
  return blog.author.toString();
}

// PUT /api/blogs/[slug] - Update blog
export const PUT = withResourceOwnership(
  getBlogAuthorId,
  async (request: NextRequest, user: any, { params }: RouteParams) => {
    try {
      await connectToDatabase();

      const slug = await resolveSlug(params);

      if (!hasPermission(user.role, 'blogs', 'canUpdate')) {
        throw new ApiError('Insufficient permissions to update blogs', 403);
      }

      const body = await request.json();
      const { title, description, content, tags } = body;

      const updateData: any = {};
      if (title) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (content !== undefined) updateData.content = content;
      if (tags !== undefined) updateData.tags = tags;

      // If title changes, regenerate slug and ensure uniqueness
      if (title) {
        const slugify = (await import('slugify')).default;
        const newSlug = slugify(title, { lower: true, strict: true });

        if (!newSlug) {
          throw new ApiError('Unable to generate slug from title', 400);
        }

        // find current blog (to compare ids)
        const currentBlog = await Blog.findOne({ slug }).select('_id');
        if (!currentBlog) throw new ApiError('Blog not found', 404);

        const existingWithNewSlug = await Blog.findOne({ slug: newSlug }).select('_id');
        if (existingWithNewSlug && existingWithNewSlug._id.toString() !== currentBlog._id.toString()) {
          throw new ApiError('Another blog already uses that slug', 409);
        }

        updateData.slug = newSlug;
      }

      const blog = await Blog.findOneAndUpdate(
        { slug },
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'name email image');

      if (!blog) {
        throw new ApiError('Blog not found', 404);
      }

      return createApiResponse(true, blog, 'Blog updated successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
);

// DELETE /api/blogs/[slug] - Delete blog
export const DELETE = withResourceOwnership(
  getBlogAuthorId,
  async (request: NextRequest, user: any, { params }: RouteParams) => {
    try {
      await connectToDatabase();

      const slug = await resolveSlug(params);

      if (!hasPermission(user.role, 'blogs', 'canDelete')) {
        throw new ApiError('Insufficient permissions to delete blogs', 403);
      }

      const blog = await Blog.findOneAndDelete({ slug });

      if (!blog) {
        throw new ApiError('Blog not found', 404);
      }

      return createApiResponse(true, null, 'Blog deleted successfully');
    } catch (error) {
      return handleApiError(error);
    }
  }
);
