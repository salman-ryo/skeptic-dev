import { connectToDatabase } from "@/lib/mongoose";
import SavedBlog from "@/models/SavedBlog";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;
  console.log("🚀 ~ blogId:", blogId)

    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ saved: false });
    }
    if (!blogId) return NextResponse.json({ saved: false });
    const userId = session.user.id; // adjust based on your session object
    const existing = await SavedBlog.
    findOne({ user: userId, blog: blogId })
  .populate({
    path: "blog",
    populate: { path: "author", select: "name email image" },
  });
    return NextResponse.json({ saved: !!existing });
  }