import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        
        const skip = (page - 1) * limit;
        const blogs = await Blog.find()
        .populate('author', 'name email image')
        .sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Blog.countDocuments();
        
        return NextResponse.json({
            blogs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching blogs:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}