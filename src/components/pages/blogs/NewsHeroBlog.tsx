import RandomQuote from "@/components/pages/blogs/RandomQuote";
import { BlogDocument } from "@/lib/types/blog";
import { formatDateUS } from "@/utils/dateTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsHeroBlog = ({ topBlog }: { topBlog: BlogDocument }) => {
  const imageBlock = topBlog?.blocks?.find((block) => block.type === "image");
  const imgSrc = imageBlock?.metadata?.url || "/images/blogs/skhero.jpg";
  return (
    <section className="relative py-8 md:py-12 px-4 md:px-6 lg:px-12 bg-amber-50 blackNwhiteLonger
     dark:bg-slate-950 dark:text-gray-300
    ">
      <div className="max-w-5xl mx-auto">
        {/* Vintage Header - Stack on mobile */}
        <div className="border-b-2 border-black mb-6 md:mb-8 pb-3 md:pb-4
         dark:border-cPeach-dark
        ">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-serif space-y-2 md:space-y-0">
            <span className="max-md:text-lg">THE SKEPTIC DEV</span>
            <span className="max-md:text-xs">VOL. CXXI • No. {topBlog.title.length}</span>
            <span className="max-md:text-xs">LATEST EDITION</span>
          </div>
        </div>

        {/* Main Feature */}
        <article className="space-y-4 md:space-y-6">
          <div className="border-b-2 border-black pb-3 md:pb-4
           dark:border-cPeach-dark
          ">
            <Link
              href={`/blogs/${topBlog.slug}`}
              className="font-serif text-3xl md:text-4xl lg:text-5xl uppercase max-md:text-center" 
            >
              {topBlog.title}
            </Link>
          </div>

          {/* Metadata - Wrap on mobile */}
          <div className="flex flex-wrap gap-2 text-xs md:text-sm italic">
            <span>By {topBlog.author.name}</span>
            <span className="hidden md:inline font-bold">•</span>
            <span>{formatDateUS(topBlog.createdAt)}</span>
            <span className="font-bold">•</span>
            <ul className="flex flex-wrap gap-2 capitalize">
              {topBlog.tags?.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          {/* Newspaper Columns - Stack on mobile */}
          <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-4 lg:gap-8 font-serif...">
            <div className="w-full md:w-1/2 text-base md:text-lg">
              <p className="drop-cap mb-4">{topBlog.description}</p>
              <RandomQuote />
            </div>
            <Image
              src={imgSrc}
              alt={topBlog.title}
              width={1920}
              height={1080}
              className="h-64 md:h-96 object-cover w-full md:w-[45%]"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default NewsHeroBlog;
