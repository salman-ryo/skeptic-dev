// /app/api/blogs/[slug]/saved/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongoose";
import SavedBlog from "@/models/SavedBlog";
import { authOptions } from "@/services/auth";
import "@/models/User";
import { Blog } from "@/models/Blog"; // Import the Blog model

// GET: Check if the blog is saved by the current user.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ saved: false }, { status: 401 });
  }
  const userId = session.user.id;
  const { slug } = await params;
  
  // Find the blog document using the slug.
  const blogDoc = await Blog.findOne({ slug });
  if (!blogDoc) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  
  // Query using the blog document's _id.
  const existing = await SavedBlog.findOne({ user: userId, blog: blogDoc._id });
  return NextResponse.json({ saved: !!existing });
}

// POST: Toggle saved status.
// If already saved, unsave; otherwise, save the blog.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { slug } = await params;
  
  // Retrieve the blog document by slug.
  const blogDoc = await Blog.findOne({ slug });
  if (!blogDoc) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  
  // Use the blog document's _id for the SavedBlog query.
  const existing = await SavedBlog.findOne({ user: userId, blog: blogDoc._id });
  if (existing) {
    // Unsave blog.
    await SavedBlog.deleteOne({ _id: existing._id });
    return NextResponse.json({ saved: false });
  } else {
    // Save blog.
    await SavedBlog.create({ user: userId, blog: blogDoc._id });
    return NextResponse.json({ saved: true });
  }
}
