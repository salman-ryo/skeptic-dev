// // app/api/blogs/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/v2/mongoose';
// import { Blog } from '@/models/v2/Blog';
// import { ApiError, handleApiError, validateObjectId } from '@/lib/v2/api/errorHandler';
// import { createApiResponse, withResourceOwnership } from '@/lib/v2/middleware/auth';
// import { hasPermission } from '@/lib/v2/rbac/permissions';

// interface RouteParams {
//   params: { id: string };
// }

// // GET /api/blogs/[id] - Get single blog (public)
// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     await connectToDatabase();
    
//     if (!validateObjectId(params.id)) {
//       throw new ApiError('Invalid blog ID', 400);
//     }

//     const blog = await Blog.findByIdAndUpdate(
//       params.id,
//       { $inc: { views: 1 } },
//       { new: true }
//     ).populate('author', 'name email image');

//     if (!blog) {
//       throw new ApiError('Blog not found', 404);
//     }

//     return createApiResponse(true, blog);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// // Resource ownership checker for blogs
// async function getBlogAuthorId(request: NextRequest, { params }: RouteParams): Promise<string> {
//   await connectToDatabase();
//   const blog = await Blog.findById(params.id).select('author');
//   if (!blog) throw new ApiError('Blog not found', 404);
//   return blog.author.toString();
// }

// // PUT /api/blogs/[id] - Update blog (authors can update their own, admins can update any)
// export const PUT = withResourceOwnership(
//   getBlogAuthorId,
//   async (request: NextRequest, user: any, { params }: RouteParams) => {
//     try {
//       await connectToDatabase();

//       if (!validateObjectId(params.id)) {
//         throw new ApiError('Invalid blog ID', 400);
//       }

//       if (!hasPermission(user.role, 'blogs', 'canUpdate')) {
//         throw new ApiError('Insufficient permissions to update blogs', 403);
//       }

//       const body = await request.json();
//       const { title, description, content, tags } = body;

//       const updateData: any = {};
//       if (title) updateData.title = title;
//       if (description !== undefined) updateData.description = description;
//       if (content) updateData.content = content;
//       if (tags !== undefined) updateData.tags = tags;

//       const blog = await Blog.findByIdAndUpdate(
//         params.id,
//         updateData,
//         { new: true, runValidators: true }
//       ).populate('author', 'name email image');

//       if (!blog) {
//         throw new ApiError('Blog not found', 404);
//       }

//       return createApiResponse(true, blog, 'Blog updated successfully');
//     } catch (error) {
//       return handleApiError(error);
//     }
//   }
// );

// // DELETE /api/blogs/[id] - Delete blog (authors can delete their own, admins can delete any)
// export const DELETE = withResourceOwnership(
//   getBlogAuthorId,
//   async (request: NextRequest, user: any, { params }: RouteParams) => {
//     try {
//       await connectToDatabase();

//       if (!validateObjectId(params.id)) {
//         throw new ApiError('Invalid blog ID', 400);
//       }

//       if (!hasPermission(user.role, 'blogs', 'canDelete')) {
//         throw new ApiError('Insufficient permissions to delete blogs', 403);
//       }

//       const blog = await Blog.findByIdAndDelete(params.id);

//       if (!blog) {
//         throw new ApiError('Blog not found', 404);
//       }

//       return createApiResponse(true, null, 'Blog deleted successfully');
//     } catch (error) {
//       return handleApiError(error);
//     }
//   }
// );
