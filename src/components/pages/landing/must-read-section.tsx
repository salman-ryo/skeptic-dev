"use client";
import BlogCard from "@/components/blog/BlogCard";
import ScrollButtons from "@/components/common/ScrollButtons";
import { H2 } from "@/components/text/heading";
import { BlogDocument } from "@/lib/types/blog";
import { useRef } from "react";

export default function MustReadBlogs({
  blogsData,
}: {
  blogsData: BlogDocument[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <H2 className="mb-8">Must-Read Blogs</H2>
        <ScrollButtons ref={scrollContainerRef} />
      </div>
      {/* Scrollable Blog Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-x-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      >
        {/* {
          error &&
          <div className="flex justify-center items-center text-xl text-gray-600 w-full">{error}</div>
        }
        {
          loading&&
          [1,2,3].map((num)=> <BlogCardSkeleton key={num}/> )
        } */}
        {blogsData &&
          blogsData.length > 0 &&
          blogsData.map((blog) => (
            <BlogCard blog={blog} key={blog._id as string} />
          ))}
      </div>
    </section>
  );
}
