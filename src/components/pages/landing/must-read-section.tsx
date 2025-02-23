"use client";
import ScrollReveal from "@/components/animation/ScrollReveal";
import BlogCard from "@/components/blog/BlogCard";
import ScrollButtons from "@/components/common/ScrollButtons";
import { H2 } from "@/components/text/heading";
import { BlogDocument } from "@/lib/types/blog";
import { slideInRightConf } from "@/utils/animationConfig";
import { useRef } from "react";

export default function MustReadBlogs({
  blogsData,
}: {
  blogsData: BlogDocument[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container mx-auto md:px-16 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center max-md:mb-8">
        <H2 className="mb-4 md:mb-8 dark:text-gray-200">Must-Read Blogs</H2>
        <ScrollButtons ref={scrollContainerRef} />
      </div>
      {/* Scrollable Blog Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-x-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      >
        {blogsData &&
          blogsData.length > 0 &&
          blogsData.map((blog) => (
            <ScrollReveal
              key={blog._id as string}
              animationVariants={slideInRightConf.variant}
            >
              <BlogCard blog={blog} key={blog._id as string} />
            </ScrollReveal>
          ))}
      </div>
    </section>
  );
}
