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
    <section className="py-12 px-4 sm:px-6 md:px-12 light:bg-white mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto">
        <H2 className="mb-6 md:mb-8 dark:text-gray-200">Latest Blogs</H2>

        {/* Responsive grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-8 max-md:justify-items-center items-center w-full">
          {blogs?.map((blog: any) => (
            <ScrollReveal key={blog._id}>
              <BlogCard blog={blog} />
            </ScrollReveal>
          ))}
        </ul>

        {loading && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-8 max-md:justify-items-center items-center w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </ul>
        )}

        {/* Responsive button */}
        {page !== totalPages && !loading && (
          <div className="mt-8 md:mt-12 flex justify-center">
            <Button
              className="rounded-full w-full sm:w-auto ..."
              onClick={handleFetchMoreBlogs}
            >
              Load More Blogs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
