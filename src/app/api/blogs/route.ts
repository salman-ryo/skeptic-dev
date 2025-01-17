// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { title, author, blocks } = body;

    if (!title || !author || !blocks) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      author,
      blocks,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({ message: 'Blog saved successfully', blog: savedBlog }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving blog:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
      await connectToDatabase();
  
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const blog = await Blog.findById(id);
        if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
      }
  
      const blogs = await Blog.find();
      return NextResponse.json(blogs, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching blogs:', error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}  