import { BlogDocument } from "@/lib/types/blog";
import { formatDateUS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  // @ts-ignore
  const mainBlog: BlogDocument = {
    _id:"abracadabra",
    title: "Abstraction | Is It Really That Bad?",
    author:"Ryo",
    description:"Dive into the debate around abstraction in software development. While abstraction is a cornerstone of clean, scalable code, it often gets a bad reputation for being overly complex or hiding critical details. In this article, we explore when abstraction is your best friend, when it becomes an obstacle, and how to strike the right balance for maintainable and efficient solutions. Whether you’re a beginner or a seasoned developer, gain a fresh perspective on one of programming’s most polarizing concepts.",
    createdAt: new Date()

  }
  return (
    <div className="bg-cBlack pb-12 px-16">
      <div className="container">
        <div className="py-8 flex justify-start items-center">
          <h1 className="text-white text-9xl font-bold tracking-tight">
            SKEPTIC DEV
          </h1>
          <p className="text-gray-400 text-xl mt-1 font-bold ml-3">
            Blog about
            <br />
            tech <br />
            code.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden p-10">
          <div className="flex justify-between items-start gap-4">
            <div className="w-1/3 mr-4">
              <time className="text-sm text-gray-500">{formatDateUS(mainBlog.createdAt)}</time>
              <h2 className="text-2xl font-semibold mt-2 mb-4">
                
              </h2>
              <p className="text-gray-600 mb-4 text-pretty">
                In the digital age, where cameras are in everyone's pocket, the
                resurgence of film photography might seem surprising. Yet, it
                has evolved from a medium of necessity to a cherished art form,
                offering a unique perspective that remains enduringly relevant
                in a world dominated by pixels.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  Cinema
                </span>
                <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  Photography
                </span>
                <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  Film
                </span>
              </div>
            </div>
            <Image
              src="/images/blogs/skhero.jpg"
              alt="Film Photography"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
