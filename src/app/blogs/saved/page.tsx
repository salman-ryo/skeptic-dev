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
  const [savedBlogs, setSavedBlogs] = useState<BlogDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }

    const fetchSavedBlogs = async () => {
      try {
        const response = await fetch("/api/user/blogs/saved",{cache:"no-store"});
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
    <div
      className={`mx-auto p-6 min-h-screen flex ${savedBlogs.length === 0 ? "justify-start items-center pt-10" : "justify-start items-start"} flex-col
    md:px-16
    `}
    >
      <H2 className="mb-16 dark:text-gray-200">Saved Blogs</H2>
      {loading && (
        <ul className="w-full flex justify-between items-center gap-x-10">
          {Array.from({ length: 3 }).map((_, index) => {
            return <BlogCardSkeleton key={index} />;
          })}
        </ul>
      )}
      {savedBlogs.length === 0 ? (
        <p className="text-gray-500">No saved blogs yet.</p>
      ) : (
        <ul
          className={`space-y-4 flex w-full items-center ${savedBlogs.length > 2 ? "justify-center" : "justify-start"}`}
        >
          {savedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </ul>
      )}
    </div>
  );
}
