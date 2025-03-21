"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BlogDocument } from "@/lib/types/blog";
import BlogCard from "../../blog/BlogCard";
import ScrollButtons from "../../common/ScrollButtons";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { slideInRightConf, mobileRevealConf } from "@/utils/animationConfig";
import { H2 } from "@/components/text/heading";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MostViewedBlogs({
  blogsData,
}: {
  blogsData: BlogDocument[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section className="relative md:px-16 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-x-20">
          {/* Static Title Card */}
          <Card className="w-full md:w-[400px] flex-shrink-0 h-full rounded-md bg-white p-2 border-2 border-cGray-light dark:bg-slate-950 dark:border-blue-400 mt-4">
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
            className="flex gap-4 md:gap-x-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory max-md:px-0 p-4"
          >
            {blogsData?.map((blog) => (
              <ScrollReveal
                key={blog._id as string}
                animationVariants={
                  isMobile ? mobileRevealConf.variant : slideInRightConf.variant
                }
                transitionConfig={
                  isMobile ? mobileRevealConf.transition : slideInRightConf.transition
                }
              >
                <BlogCard blog={blog}/>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}