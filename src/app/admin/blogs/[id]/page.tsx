"use client";
import { useEffect, useState } from "react";
import { BlogDocument } from "@/lib/types/blog";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { formatDateUS } from "@/lib/utils";
import { Bar } from "@/components/common/Bar";
import Link from "next/link";
import { extLink } from "@/lib/externalLinks";
import ShareSection from "@/components/blog/ShareSection";

export default function BlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs?id=${params.id}`);
        const data = await response.json();
        console.log("🚀 ~ fetchBlog ~ response:", data)
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
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
        <h1 className="text-5xl font-bold mt-8 mb-4">{blog.title}</h1>
        {
          blog.description&&
        <p className="text-cGray text-lg font-medium mb-4">{blog.description}</p>
        }
        {/* Author and date */}
        <div className="flex justify-start items-center space-x-3 font-medium text-cGray-light mb-4">
          <span className="flex justify-start items-center space-x-2">
            <span>
          - By 
            </span>
          <Link title="View Author" href={extLink.author} referrerPolicy="no-referrer" target="_blank" className="font-semibold text-cGray">
          {blog.author}
          </Link>
          </span>
          <Bar/>
          <span>
           {formatDateUS(new Date(blog.createdAt))}
          </span>
        </div>
        <ShareSection/>
      </header>
      {
        blog?.blocks &&
      <div className="prose prose-lg max-w-none">
        {blog.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
      }
    </article>
  );
}
