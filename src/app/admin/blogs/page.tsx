"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogDocument } from "@/lib/types/blog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  Delete,
  DeleteIcon,
  Edit,
  Trash,
} from "lucide-react";
import { formatDateUS } from "@/utils/dateTime";
import { calculateReadTime, limitWords } from "@/utils/text";
import { H2 } from "@/components/text/heading";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/admin/blogs");
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
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
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

  return (
    <div className="container mx-auto p-6 md:p-16">
      <H2 className="mb-16 text-white dark:text-gray-200">All Blogs</H2>
      {loading && (
        <ul className="w-full flex justify-between items-center gap-x-10">
          {Array.from({ length: 3 }).map((_, index) => {
            return <BlogCardSkeleton key={index} />;
          })}
        </ul>
      )}
      {blogs && blogs.length === 0 && (
        <p className="text-center text-white text-lg">No blogs found</p>
      )}

      {blogs && (
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog, index) => {
            // Extract image from blocks if it exists
            const imageBlock = blog.blocks?.find(
              (block) => block.type === "image"
            );
            const imgSrc =
              imageBlock?.metadata?.url || "/images/blogs/computer-loading.jpg";
            const altText = imageBlock?.metadata?.alt || "Blog image";
            return (
              <Card
                className="flex flex-col shadow-sm shadow-gray-400"
                key={index}
              >
                <div className="mb-4 p-4">
                  <img
                    src={imgSrc}
                    alt={altText}
                    className="w-full h-[210px] object-cover rounded-sm"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <CardDescription>by {blog.author.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {blog.description && (
                    <p className="text-muted-foreground">
                      {limitWords(blog.description, 25)}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags?.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <time dateTime={formatDateUS(blog.createdAt)}>
                      {formatDateUS(blog.createdAt)}
                    </time>
                  </div>
                  {blog.updatedAt && (
                    <div className="flex items-center ml-4">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      <time dateTime={formatDateUS(blog.updatedAt)}>
                        Updated: {formatDateUS(blog.updatedAt)}
                      </time>
                    </div>
                  )}
                  {blog.blocks && (
                    <p className="ml-2 font-bold">
                      {calculateReadTime(blog.blocks)} min read
                    </p>
                  )}
                </CardFooter>
                <div className="flex justify-center items-center">
                  <button
                    className="m-4 text-red-500"
                    onClick={() => handleDelete(blog._id as string)}
                  >
                    <Trash className="hover:scale-110 transition-transform duration-300" />
                  </button>
                  <Link href={`/admin/edit-blog/${blog._id}`}>
                    <Edit className="hover:scale-110 transition-transform duration-300" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
