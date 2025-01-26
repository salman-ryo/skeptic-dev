"use client";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import ScrollButtons from "@/components/common/ScrollButtons";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogDocument } from "@/lib/types/blog";
import { api } from "@/utils/apiClient";
import { useEffect, useRef, useState } from "react";

export default function MustReadBlogs() {
  const [blogsData, setBlogsData] = useState<null | BlogDocument[]>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogsByViews = async () => {
      setLoading(true)
      try {
        const response = await api.get("/api/blogs");
        if (response.status === 200) {
          setBlogsData(response.data as BlogDocument[]);
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch blogs")
        alert(error)
      } finally{
        setLoading(false)
      }
    };
    fetchBlogsByViews();
  }, []);
  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <SectionHeading className="mb-8">Must-Read Blogs</SectionHeading>
        {/* <div className="flex gap-x-2 justify-end items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full size-8 shadow-md shadow-gray-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full size-8 shadow-md shadow-gray-600"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div> */}
        <ScrollButtons ref={scrollContainerRef}/>
      </div>
      {/* Scrollable Blog Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-x-20 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      >
        {
          error &&
          <div className="flex justify-center items-center text-xl text-gray-600 w-full">{error}</div>
        }
        {
          loading&&
          [1,2,3].map((num)=> <BlogCardSkeleton key={num}/> )
        }
        {blogsData &&
          blogsData.length > 0 &&
          blogsData.map((blog) => <BlogCard blog={blog} key={blog._id as string} />)}
      </div>
    </section>
  );
}
