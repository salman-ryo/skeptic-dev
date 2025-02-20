import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, blocks, tags } = body;
  if (!title || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = session.user;
    if (user.role !== "author" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const newBlog = new Blog({
      title,
      description,
      author: user.id,
      blocks,
      tags,
    });
    const savedBlog = await newBlog.save();
    return NextResponse.json(
      { message: "Blog saved successfully", blog: savedBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving blog:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Check if the user is authenticated and has a valid role.
    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "author" && session.user.role !== "admin")
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // If an "id" is provided, return that single blog.
    if (id) {
      const blog = await Blog.findById(id).populate(
        "author",
        "name email image"
      );
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog, { status: 200 });
    }

    // --- Pagination Logic ---
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    // Build the query filter based on the user role.
    let filter = {};
    if (session.user.role === "author") {
      filter = { author: session.user.id };
    }
    // For admin, no additional filter is needed.

    // Fetch the paginated blogs and sort them by creation date (most recent first).
    const blogs = await Blog.find(filter)
      .populate("author", "name email image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count the total blogs matching the filter to determine if there are more pages.
    const totalBlogs = await Blog.countDocuments(filter);
    const hasMore = skip + blogs.length < totalBlogs;

    return NextResponse.json(
      { blogs, hasMore, page, total: totalBlogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message);
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
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Blog deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: "Blog Id is required" }, { status: 400 });
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
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const user = session.user;
    if (user.role !== "admin" && blog.author.toString() !== user.id) {
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
