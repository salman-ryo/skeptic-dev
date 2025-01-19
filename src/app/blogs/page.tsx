"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogDocument } from "@/lib/types/blog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      {blogs && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog._id as string}
              className="hover:shadow-lg transition-shadow"
            >
              <Link href={`/blogs/${blog._id}`}>
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <div className="text-sm text-gray-500">
                    By {blog.author} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                {blog.description && (
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">
                      {blog.description || "No content available"}
                    </p>
                  </CardContent>
                )}
              </Link>
              <Button
                className="mt-2"
                onClick={() => handleDelete(blog._id as string)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
