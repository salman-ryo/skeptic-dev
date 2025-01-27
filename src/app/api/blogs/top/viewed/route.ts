import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Fetch top 5 most viewed blogs
    const topBlogs = await Blog.find().sort({ views: -1 }).limit(5);

    if (!topBlogs.length) {
      return NextResponse.json({ error: 'No blogs found' }, { status: 404 });
    }

    return NextResponse.json(topBlogs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching top blogs:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
