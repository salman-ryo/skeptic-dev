// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import '@/models/User';


export async function GET(req: Request) {
    try {
      await connectToDatabase();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const blog = await Blog.findById(id)
        .populate('author', 'name email image')
        ;
        if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
      }
  
      const blogs = await Blog.find()
      .populate('author', 'name email image');
      return NextResponse.json(blogs, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching blogs:', error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}  
export async function DELETE(req: Request) {
    try {
      await connectToDatabase();
  
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({message: 'Blog deleted successfully'}, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Blog Id is required' }, { status: 400 });
      }
    } catch (error: any) {
      console.error('Error deleting :', error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
  try {
      await connectToDatabase();
      
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
          return NextResponse.json({ error: 'Blog Id is required' }, { status: 400 });
      }
      
      const body = await req.json();
      const { title, description, author, blocks, tags } = body;

      const updatedBlog = await Blog.findByIdAndUpdate(
          id,
          { title, description, author, blocks, tags },
          { new: true, runValidators: true } // Return updated document and ensure validation
      );

      if (!updatedBlog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Blog updated successfully', blog: updatedBlog }, { status: 200 });

  } catch (error: any) {
      console.error('Error updating blog:', error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
