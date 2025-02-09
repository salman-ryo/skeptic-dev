import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { authOptions } from "@/services/auth";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({ author: session.user.id })
      .skip(skip)
      .limit(limit);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching my blogs:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Blog Id is required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
      }
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    } else {
      await blog.delete();
    }
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Blog Id is required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
      }
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const user = session.user;
    if (blog.author.toString() !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const { title, description, blocks, tags } = body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, blocks, tags },
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating blog:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
