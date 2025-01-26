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
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { useRandomImage } from "@/hooks/useRandomImage";
import { formatDateUS } from "@/utils/dateTime";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const fallbackImg = useRandomImage();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        console.log("🚀 ~ fetchBlogs ~ data:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
          {blogs.map((blog, index) =>{
            return(
                <Link href={`/blogs/${blog._id}`} key={index}>
              <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 max-w-md">
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <CardDescription>by {blog.author}</CardDescription>
                  {blog?.blocks &&
                    Array.isArray(blog.blocks) &&
                    blog.blocks.length > 0 && (
                      <Image
                        src={
                          blog.blocks[0]?.type !== "image" &&
                          blog.blocks[0]?.metadata?.url
                            ? blog.blocks[0].metadata.url
                            : fallbackImg.url
                        }
                        alt={blog.title}
                        width={300}
                        height={200}
                        className="w-full h-52 object-cover rounded-lg"
                      />
                    )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{blog.description}</p>
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
                    <time dateTime={formatDateUS(new Date(blog.createdAt))}>
                      {formatDateUS(new Date(blog.createdAt))}
                    </time>
                  </div>
                  {blog.updatedAt && (
                    <div className="flex items-center ml-4">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      <time dateTime={formatDateUS(new Date(blog.updatedAt))}>
                        Updated: {formatDateUS(new Date(blog.updatedAt))}
                      </time>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
            )
          }
            
          )}
        </div>
      )}
    </div>
  );
}
