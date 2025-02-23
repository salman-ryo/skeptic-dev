"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BlogDocument } from "@/lib/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import { H2 } from "@/components/text/heading";

export default function SavedBlogsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedBlogs, setSavedBlogs] = useState<BlogDocument[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }

    const fetchSavedBlogs = async () => {
      try {
        const response = await fetch("/api/user/blogs/saved", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch saved blogs");
        const data = await response.json();
        setSavedBlogs(data.map((item: { blog: BlogDocument }) => item.blog)); // Extract blog details
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchSavedBlogs();
  }, [session, status, router]);

  return (
    <div className="container mx-auto min-h-screen flex flex-col px-4 sm:px-10 md:px-20 py-6 md:py-10">
      <H2 className="mb-16 text-gray-200">Saved Blogs</H2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : savedBlogs?.length === 0 ? (
        <p className="text-gray-500">No saved blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-md:justify-items-center items-center w-full">
          {savedBlogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
