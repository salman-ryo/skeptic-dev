import { connectToDatabase } from "@/lib/mongoose";
import SavedBlog from "@/models/SavedBlog";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import '@/models/User';


export async function POST(request: NextRequest) {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: 'Blog slug is required' }, { status: 400 });
    }
    const userId = session.user.id;
    const existing = await SavedBlog.findOne({ user: userId, blog: slug });
    if (existing) {
      // Unsave blog
      await SavedBlog.deleteOne({ _id: existing._id });
      return NextResponse.json({ saved: false });
    } else {
      // Save blog
      await SavedBlog.create({ user: userId, blog: slug });
      return NextResponse.json({ saved: true });
    }
  }