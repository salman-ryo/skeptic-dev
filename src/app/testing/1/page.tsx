"use client";
import RandomQuote from "@/components/pages/blogs/RandomQuote";
import Image from "next/image";
import { useState } from "react";
import BlogsSection from "./BlogsSection";
import { H2 } from "@/components/text/heading";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export default function BlogsPage() {
  const [featuredPost] = useState<BlogPost>({
    id: 1,
    title: "Breaking News: The Renaissance of Print in Digital Age",
    excerpt:
      "In an unexpected twist, millennials are driving a resurgence of physical newspapers...",
    date: "September 28, 2023",
    author: "Inkwell Montgomery",
    category: "Media Trends",
    readTime: "8 min read",
  });

  const [recentPosts] = useState<BlogPost[]>([
    // Add more posts here
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Newspaper Hero Section */}
      <div className="bg-cGray-dark w-full px-10 md:px-20 py-10">
      <section className="relative py-12 px-6 md:px-12 bg-amber-50 blackNwhite">
        {/* <section className="relative py-12 px-6 md:px-12 bg-[url('https://cdn.pixabay.com/photo/2014/11/28/09/13/paper-548650_1280.jpg')] bg-repeat"> */}
        {/* Torn Edge Effect */}
        {/* <div className="absolute inset-x-0 -bottom-2 h-6 bg-no-repeat bg-center bg-[url('https://cdn.pixabay.com/photo/2015/10/24/18/48/torn-paper-1004811_1280.jpg')]"></div> */}

        <div className="max-w-5xl mx-auto">
          {/* Vintage Header */}
          <div className="border-b-2 border-black mb-8 pb-4">
            <div className="flex justify-between items-center text-sm font-serif">
              <span>THE SKEPTIC DEV</span>
              <span>VOL. CXXI • No. 3{new Date().getDay()}</span>
              <span>LATEST EDITION</span>
            </div>
          </div>

          {/* Main Feature */}
          <article className="space-y-6">
            <h1 className="font-serif text-5xl leading-tight border-b-2 border-black pb-4 uppercase">
              {featuredPost.title}
            </h1>

            {/* <Image
            src={"/images/blogs/skhero.jpg"} alt="Nothing" width={1920} height={1080} className="blackNwhite h-96 object-cover w-full"
            /> */}

            <div className="flex gap-4 text-sm italic">
              <span>By {featuredPost.author}</span>
              <span className="font-bold">•</span>
              <span>{featuredPost.date}</span>
              <span className="font-bold">•</span>
              <span>{featuredPost.category}</span>
            </div>

            {/* Newspaper Columns */}
            <div className="grid md:grid-cols-2 font-serif text-lg leading-relaxed">
              <div className="mr-6">
                <p className="drop-cap">
                  {featuredPost.excerpt} The smell of fresh ink on paper fills
                  the air as young professionals are increasingly spotted
                  carrying folded broadsheets...
                </p>

                <div className="space-y-4">
                  <p>
                    Coffee shops now offer newspaper subscriptions instead of
                    WiFi passwords, creating a new social dynamic...
                  </p>
                  <RandomQuote />
                </div>
              </div>
              <Image
                src={"/images/blogs/skhero.jpg"}
                alt="Nothing"
                width={1920}
                height={1080}
                className="blackNwhite h-full object-cover w-auto"
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

      <BlogsSection />
      {/* Modern Blog Section */}
    </div>
  );
}
