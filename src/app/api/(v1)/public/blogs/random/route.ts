import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import '@/models/User';


export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Count total number of blogs
    const totalBlogs = await Blog.countDocuments();

    if (totalBlogs === 0) {
      return NextResponse.json({ error: 'No blogs found' }, { status: 404 });
    }

    // Generate random indexes to fetch random blogs
    const randomIndexes = Array.from({ length: Math.min(5, totalBlogs) }, () =>
      Math.floor(Math.random() * totalBlogs)
    );

    // Fetch random blogs using their indexes
    const randomBlogs = await Blog.find()
    .populate('author', 'name email image')
    .skip(randomIndexes[0]).limit(5);
    return NextResponse.json(randomBlogs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching random blogs:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
