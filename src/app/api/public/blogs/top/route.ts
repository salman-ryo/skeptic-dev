import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import '@/models/User';


export async function GET() {
  try {
    await connectToDatabase();

    // Find the blog with the highest number of views
    const mostViewedBlog = await Blog.findOne()
    .populate('author', 'name email image')
    .sort({ views: -1 }).limit(1);

    if (!mostViewedBlog) {
      return NextResponse.json({ error: 'No blogs found' }, { status: 404 });
    }

    return NextResponse.json(mostViewedBlog, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching most viewed blog:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}