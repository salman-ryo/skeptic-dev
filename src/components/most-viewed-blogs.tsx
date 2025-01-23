"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const blogs = [
  {
    imgSrc: "/placeholder.svg?height=300&width=400",
    alt: "Leo Hart",
    badges: ["Music", "City", "Personality"],
    date: "September 10, 2024",
    title: "Soundscapes of the City: An Interview with Leo Hart",
    readTime: "8 min read",
    description:
      "Explore the world of sound artist Leo Hart, who transforms urban noise into captivating musical compositions.",
    link: "#",
  },
  {
    imgSrc: "/placeholder.svg?height=300&width=400",
    alt: "Eva Martinez",
    badges: ["Personality", "Art", "Artist"],
    date: "November 7, 2024",
    title: "Eva Martinez: The Visionary Behind the Canvas",
    readTime: "16 min read",
    description:
      "Discover the creative journey of Eva Martinez, a self-taught painter whose bold use of color and texture redefines modern art.",
    link: "#",
  },
  {
    imgSrc: "/placeholder.svg?height=300&width=400",
    alt: "Urban Art",
    badges: ["Art", "Urban"],
    date: "December 15, 2024",
    title: "The Rise of Urban Art Movements",
    readTime: "12 min read",
    description:
      "An in-depth look at how street art is reshaping contemporary artistic expression in major cities.",
    link: "#",
  },
];

export default function MostViewedBlogs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex gap-x-4">
          {/* Static Title Card */}
          <Card className="w-[400px] flex-shrink-0 h-full bg-white p-2 border-2 border-cGray-light">
            <CardContent className="p-6 flex flex-col justify-between">
              <div className="mb-4">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-cGray-dark">
                  Most <br /> Viewed <br /> Blogs
                </h2>
              </div>
              <div className="flex gap-x-2 justify-end items-center">
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
              </div>
            </CardContent>
          </Card>

          {/* Scrollable Blog Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {blogs.map((blog, index) => (
              <Card
                key={index}
                className="w-[400px] flex-shrink-0 bg-white h-full border-2 border-cGray-light snap-center"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={blog.imgSrc}
                      alt={blog.alt}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {blog.badges.map((badge, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="rounded-full bg-gray-200 text-gray-700"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">{blog.date}</p>
                    <Link href={blog.link} className="block">
                      <h3 className="text-xl font-bold hover:text-gray-700">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{blog.readTime}</p>
                    <p className="text-gray-600">{blog.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
