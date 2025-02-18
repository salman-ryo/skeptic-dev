import { getServerSession } from "next-auth";
import SavedBlog from "@/models/SavedBlog";
import { connectToDatabase } from "@/lib/mongoose";
import { authOptions } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectToDatabase();

  const session = await getServerSession({ req: req, ...authOptions });

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
