"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BlogDocument } from "@/lib/types/blog";
import BlogCard from "../../blog/BlogCard";
import ScrollButtons from "../../common/ScrollButtons";
import ScrollReveal from "@/components/animation/ScrollReveal";
import {
  slideInRightConf,
} from "@/utils/animationConfig";
import { H2 } from "@/components/text/heading";

export default function MostViewedBlogs({
  blogsData,
}: {
  blogsData: BlogDocument[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
      <section className="relative light:bg-gray-100 md:px-16 py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-x-4 md:gap-x-20">
            {/* Static Title Card */}
            <Card className="w-[400px] flex-shrink-0 h-full rounded-md bg-white p-2 border-2 border-cGray-light
            dark:bg-slate-950 dark:border-blue-400
            ">
              <CardContent className="p-6 flex flex-col justify-between">
                <div className="mb-4">
                  <H2 className="dark:text-gray-200">
                    Most <br /> Viewed <br /> Blogs
                  </H2>
                </div>
                <ScrollButtons ref={scrollContainerRef} />
              </CardContent>
            </Card>

            {/* Scrollable Blog Cards */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-x-20  overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            >
              {/* {error && (
              <div className="flex justify-center items-center text-xl text-gray-600 w-full">
                {error}
              </div>
            )}
            {loading && [1, 2, 3].map((num) => <BlogCardSkeleton key={num} />)} */}
              {blogsData &&
                blogsData.length > 0 &&
                blogsData.map((blog) => (
                <ScrollReveal key={blog._id as string}
                animationVariants={slideInRightConf.variant}
                >
                  <BlogCard blog={blog} key={blog._id as string} />
                </ScrollReveal>
                ))}
            </div>
          </div>
        </div>
      </section>
  );
}
