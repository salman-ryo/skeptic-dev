"use client";
import { useEffect, useState } from "react";
import { BlogDocument } from "@/lib/types/blog";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { Bar } from "@/components/common/Bar";
import ShareSection from "@/components/blog/ShareSection";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import { formatDateUS } from "@/utils/dateTime";
import UserAvatar from "@/components/common/UserAvatar";

export default function BlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogDocument | null>(null);
  console.log("🚀 ~ BlogPage ~ blog:", blog)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/public/blogs?id=${params.id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    const updateBlogViews = async () => {
      try {
        await fetch("/api/public/blogs/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogId: params.id }),
        });
      } catch (error) {
        console.error("Error updating blog views:", error);
      }
    };

    fetchBlog();
    updateBlogViews();
  }, [params.id]);

  if (loading) {
    return <BlogSkeleton />;
  }

  if (!blog) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full light:bg-white">
    <article className="w-full md:w-[70%] mx-auto p-6">
      <header className="mb-8">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex justify-start items-center gap-x-4">
            {blog.tags.map((tag, index) => (
              <div
                className="flex justify-center items-center gap-x-4"
                key={index}
              >
                <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300 capitalize
                dark:text-cyan-400
                ">
                  {tag}
                </span>
                {index < (blog.tags as string[]).length - 1 && (
                  <Bar className="w-[2px]" />
                )}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-5xl font-bold mt-8 mb-4
        dark:text-gray-200
        ">{blog.title}</h1>
        {blog.description && (
          <p className="text-cGray text-lg font-medium mb-4
          dark:text-cGray-light
          ">
            {blog.description}
          </p>
        )}
        <div className="flex justify-start items-center space-x-6 font-medium mb-4">
          <div className="flex justify-start items-center space-x-2">
              <div className="flex gap-x-2">
                <UserAvatar
                  className="size-12"
                  user={blog.author}
                />
                <div className="flex flex-col justify-start items-start text-gray-500
                ">
                  <span className="font-semibold dark:text-blue-400">{blog.author.name}</span>
                  <span className="text-sm dark:text-gray-400">Author</span>
                </div>
              </div>
          </div>
          <Bar />
          <span className="text-gray-500 dark:text-gray-400">{formatDateUS(new Date(blog.createdAt))}</span>
        </div>
        <ShareSection blogId={params.id} />
      </header>
      {blog.blocks && (
        <div className="prose prose-lg max-w-none">
          {blog.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      )}
    </article>
    </main>
  );
}
