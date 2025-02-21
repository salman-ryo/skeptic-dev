import { connectToDatabase } from "@/lib/mongoose";
import SavedBlog from "@/models/SavedBlog";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import '@/models/User';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const blogId  = (await params).blogId;
  if (!blogId) return NextResponse.json({ error:"No blog found" },{status:404});


    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ saved: false });
    }
    const userId = session.user.id; // adjust based on your session object
    const existing = await SavedBlog.
    findOne({ user: userId, blog: blogId })
  .populate({
    path: "blog",
    populate: { path: "author", select: "name email image" },
  });
    return NextResponse.json({ saved: !!existing });
  }