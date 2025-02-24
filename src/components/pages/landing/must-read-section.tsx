"use client";
import { useRef } from "react";
import ScrollReveal from "@/components/animation/ScrollReveal";
import BlogCard from "@/components/blog/BlogCard";
import ScrollButtons from "@/components/common/ScrollButtons";
import { H2 } from "@/components/text/heading";
import { BlogDocument } from "@/lib/types/blog";
import { slideInRightConf } from "@/utils/animationConfig";

export default function MustReadBlogs({
  blogsData,
}: {
  blogsData: BlogDocument[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container mx-auto px-4 md:px-16 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <H2 className="mb-4 md:mb-8 dark:text-gray-200">Must-Read Blogs</H2>
        <ScrollButtons ref={scrollContainerRef} />
      </div>
      {/* Scrollable Blog Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-x-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      >
        {blogsData?.length > 0 &&
          blogsData.map((blog) => (
            <ScrollReveal
              key={blog._id as string}
              animationVariants={slideInRightConf.variant}
            >
              <div className="flex-shrink-0 snap-center w-[90vw] sm:w-[350px] md:w-[400px]">
                <BlogCard blog={blog} />
              </div>
            </ScrollReveal>
          ))}
      </div>
    </section>
  );
}
