"use client";
import { useEffect, useState } from "react";
import { BlogDocument } from "@/lib/types/blog";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { Bar } from "@/components/common/Bar";
import Link from "next/link";
import { extLink } from "@/lib/externalLinks";
import ShareSection from "@/components/blog/ShareSection";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import { formatDateUS } from "@/utils/dateTime";

export default function BlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs?id=${params.id}`);
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
        await fetch("/api/blogs/views", {
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
    <article className="w-full md:w-[70%] mx-auto p-6">
      <header className="mb-8">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex justify-start items-center gap-x-4">
            {blog.tags.map((tag, index) => (
              <div className="flex justify-center items-center gap-x-4" key={index}>
                <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300 capitalize">
                  {tag}
                </span>
                {index < (blog.tags as string[]).length - 1 && <Bar className="w-[2px]" />}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-5xl font-bold mt-8 mb-4">{blog.title}</h1>
        {blog.description && (
          <p className="text-cGray text-lg font-medium mb-4">{blog.description}</p>
        )}
        <div className="flex justify-start items-center space-x-3 font-medium text-cGray mb-4">
          <span className="flex justify-start items-center space-x-2">
            <span>- By</span>
            <Link
              title="View Author"
              href={extLink.author}
              referrerPolicy="no-referrer"
              target="_blank"
              className="font-semibold text-cGray"
            >
              {blog.author}
            </Link>
          </span>
          <Bar />
          <span>{formatDateUS(new Date(blog.createdAt))}</span>
        </div>
        <ShareSection />
      </header>
      {blog.blocks && (
        <div className="prose prose-lg max-w-none">
          {blog.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      )}
    </article>
  );
}
