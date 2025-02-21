import { getServerSession } from "next-auth";
import SavedBlog from "@/models/SavedBlog";
import { connectToDatabase } from "@/lib/mongoose";
import { authOptions } from "@/services/auth";
import {  NextResponse } from "next/server";
import '@/models/User';


export async function GET(req: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const savedBlogs = await SavedBlog.find({ user: userId }).populate({
      path: "blog",
      populate: { path: "author", select: "name email image" }, // Populate the author inside the blog
    });

    return NextResponse.json(savedBlogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching saved blogs" },
      { status: 500 }
    );
  }
}
