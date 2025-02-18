"use client";
import ScrollReveal from "@/components/animation/ScrollReveal";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import { H2 } from "@/components/text/heading";
import { Button } from "@/components/ui/button";
import { usePaginatedBlogs } from "@/hooks/usePaginatedBlogs";
import { useState } from "react";

export default function BlogsSection() {
  const [page, setPage] = useState(1);
  const { blogs, totalPages, loading, error } = usePaginatedBlogs(page, 6);

  // if (error) return <p>Error: {error}</p>;
  const handleFetchMoreBlogs = async () => {
    if (page === totalPages) {
      return;
    }
    setPage((prev) => prev + 1);
  };
  return (
    <section className="py-16 px-6 md:px-12 light:bg-white mt-20">
      <div className="max-w-7xl mx-auto">
        <H2
          className="mb-8
        dark:text-gray-200
        "
        >
          Latest Blogs
        </H2>

        <ul className="grid grid-cols-3 justify-center items-center md:gap-10">
          {blogs?.map((blog: any) => (
            <ScrollReveal key={blog._id}>
              <BlogCard blog={blog} />
            </ScrollReveal>
          ))}
        </ul>
        {loading && (
          <ul className="grid grid-cols-3 gap-y-8 mt-8 justify-center items-center">
            {Array.from({ length: 3 }).map((_, index) => {
              return <BlogCardSkeleton key={index} />;
            })}
          </ul>
        )}
        {/* Load More Button */}
        {page !== totalPages && !loading && (
          <div className="mt-12 flex justify-center">
            <Button
              className="rounded-full border-2
            dark:bg-black dark:text-white dark:border-blue-400 dark:hover:bg-black dark:hover:shadow-md dark:hover:shadow-cyan-400 transition-all duration-300
            "
              onClick={handleFetchMoreBlogs}
              disabled={loading}
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
