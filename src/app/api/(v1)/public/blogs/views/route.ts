import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { blogId } = await req.json();
    if (!blogId) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }

    await connectToDatabase();

    // Check for existing view
    const cookieStore = await cookies();
    let uniqueVisitorId = cookieStore.get(`viewed_${blogId}`)?.value;

    if (!uniqueVisitorId) {
      // Generate new UUID
      uniqueVisitorId = uuidv4();
      cookieStore.set(`viewed_${blogId}`, uniqueVisitorId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1, // 1 day
      });

      // Increment unique views in DB
      await Blog.updateOne(
        { _id: blogId },
        { $inc: { views: 1 } }
      );

      return NextResponse.json({ success: true, newView: true });
    }

    return NextResponse.json({ success: true, newView: false });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
