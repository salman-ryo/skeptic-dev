import RandomQuote from "@/components/pages/blogs/RandomQuote";
import Image from "next/image";
import { useState } from "react";
import BlogsSection from "./BlogsSection";
import { H2 } from "@/components/text/heading";
import { title } from "process";
import { fetchTopBlog } from "@/actions/blog";
import { BlogDocument } from "@/lib/types/blog";
import { formatDateUS } from "@/utils/dateTime";
import { Blog } from "@/models/Blog";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export default async function BlogsPage() {
  const topBlog: BlogDocument = await fetchTopBlog();

  const imageBlock = topBlog?.blocks?.find((block) => block.type === "image");
  const imgSrc = 
  imageBlock?.metadata?.url ||
  "/images/blogs/skhero.jpg";
  
  return (
    <div className="min-h-screen bg-white">
      {topBlog && (
        <div className="bg-cGray-dark w-full px-10 md:px-20 py-10">
          <section className="relative py-12 px-6 md:px-12 bg-amber-50 blackNwhite">
            <div className="max-w-5xl mx-auto">
              {/* Vintage Header */}
              <div className="border-b-2 border-black mb-8 pb-4">
                <div className="flex justify-between items-center text-sm font-serif">
                  <span>THE SKEPTIC DEV</span>
                  <span>VOL. CXXI • No. {topBlog.title.length}</span>
                  <span>LATEST EDITION</span>
                </div>
              </div>

              {/* Main Feature */}
              <article className="space-y-6">
                <Link href={`/blogs/${topBlog._id}`} className="font-serif text-5xl border-b-2 border-black pb-4 uppercase">
                  {topBlog.title}
                </Link>

                <div className="flex gap-4 text-sm italic">
                  <span>By {topBlog.author}</span>
                  <span className="font-bold">•</span>
                  <span>{formatDateUS(topBlog.createdAt)}</span>
                  <span className="font-bold">•</span>
                  <ul className="flex justify-center items-center capitalize gap-x-4">
                    {topBlog.tags &&
                      topBlog.tags.length > 0 &&
                      topBlog.tags?.map((tag) => {
                        return <li key={tag}>{tag}</li>;
                      })}
                  </ul>
                </div>

                {/* Newspaper Columns */}
                <div className="flex flex-col md:flex-row items-start font-serif justify-between text-lg leading-relaxed ">
                  <div className="w-1/2">
                    <p className="drop-cap mb-4">{topBlog.description}</p>

                    <RandomQuote />
                  </div>
                  <Image
                    src={imgSrc}
                    alt={topBlog.title}
                    width={1920}
                    height={1080}
                    className="blackNwhite h-96 object-cover w-[45%]"
                  />
                </div>
              </article>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-x-3 blackNwhite">
              <div className="size-3 rounded-full bg-red-500"></div>
              <div className="size-3 rounded-full bg-green-500"></div>
              <div className="size-3 rounded-full bg-blue-500"></div>
            </div>
          </section>
        </div>
      )}
      {/* Newspaper Hero Section */}

      <BlogsSection />
      {/* Modern Blog Section */}
    </div>
  );
}
