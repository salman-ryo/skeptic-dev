"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/utils/apiClient";
import { BlogDocument } from "@/lib/types/blog";
import BlogCard from "../../blog/BlogCard";
import ScrollButtons from "../../common/ScrollButtons";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";

export default function   MostViewedBlogs({blogsData}:{blogsData: BlogDocument[]}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const [blogsData, setBlogsData] = useState<null | BlogDocument[]>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | string>(null);
  // useEffect(() => {
  //   const fetchBlogsByViews = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get("/api/blogs");
  //       if (response.status === 200) {
  //         setBlogsData(response.data as BlogDocument[]);
  //       }
  //     } catch (error: any) {
  //       setError(error.message || "Failed to fetch blogs");
  //       alert(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBlogsByViews();
  // }, []);

  return (
    <section className="relative py-12">
      <div className="container mx-auto px-4">
        <div className="flex gap-x-4 md:gap-x-20">
          {/* Static Title Card */}
          <Card className="w-[400px] flex-shrink-0 h-full rounded-md bg-white p-2 border-2 border-cGray-light">
            <CardContent className="p-6 flex flex-col justify-between">
              <div className="mb-4">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-cGray-dark">
                  Most <br /> Viewed <br /> Blogs
                </h2>
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
              blogsData.map((blog) => <BlogCard blog={blog} key={blog._id as string} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
