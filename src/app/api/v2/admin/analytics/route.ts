// app/api/admin/analytics/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Collection } from '@/models/v2/SavedCollection';
import User from '@/models/User';
import { withRole, createApiResponse } from '@/lib/v2/middleware/auth';
import { handleApiError } from '@/lib/v2/api/errorHandler';

// GET /api/admin/analytics - Get platform analytics (admin only)
export const GET = withRole(['admin'], async (request: NextRequest, user: any) => {
  try {
    await connectToDatabase();

    const [
      totalUsers,
      totalBlogs,
      totalCollections,
      usersByRole,
      blogsByMonth,
      topBlogs,
      totalViews
    ] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Collection.countDocuments(),
      User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]),
      Blog.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
      ]),
      Blog.find()
        .sort({ views: -1 })
        .limit(10)
        .populate('author', 'name')
        .select('title views author'),
      Blog.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$views' }
          }
        }
      ])
    ]);

    return createApiResponse(true, {
      overview: {
        totalUsers,
        totalBlogs,
        totalCollections,
        totalViews: totalViews[0]?.total || 0
      },
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>),
      blogsByMonth,
      topBlogs
    });
  } catch (error) {
    return handleApiError(error);
  }
});
