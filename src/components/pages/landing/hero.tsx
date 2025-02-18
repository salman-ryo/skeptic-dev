import AnimationWrapper from "@/components/animation/AnimationWrapper";
import { H3 } from "@/components/text/heading";
import { BlogDocument } from "@/lib/types/blog";
import {  slideInLeftConf, slideInRightConf } from "@/utils/animationConfig";
import { formatDateUS } from "@/utils/dateTime";
import { calculateReadTime } from "@/utils/text";
import Image from "next/image";
import Link from "next/link";

export function Hero({ blog }: { blog: BlogDocument }) {
  const imageBlock = blog.blocks?.find((block) => block.type === "image");
  const imgSrc =
    imageBlock?.metadata?.url ||
    "https://cdn.pixabay.com/photo/2024/05/16/20/21/digital-8766930_1280.png";
  const altText = imageBlock?.metadata?.alt || blog.title;
  return (
    <div className="pb-12 md:px-16 px-6">
      <div className="container mx-auto">
        <AnimationWrapper animationConfig={slideInLeftConf}>
        <div className="py-8 flex justify-start items-center select-none">
          <h1 className="text-white text-5xl md:text-9xl font-bold tracking-tight">
          {/* <h1 className="text-white text-[7dvw] font-bold tracking-tight bg-yellow-400"> */}
            SKEPTIC DEV
          </h1>
          <p className="text-gray-400 dark:text-gray-300 text-[0.5rem] md:text-base font-bold ml-6">
            Eat
            <br />
            Sleep <br />
            Code <br />
            Repeat
          </p>
        </div>
        </AnimationWrapper>
        {blog && (
          <AnimationWrapper animationConfig={slideInRightConf}>
            <div className="bg-gray-100  dark:bg-slate-950 md:border-2 dark:border-blue-300 rounded-md overflow-hidden p-4 md:p-10">
              <div className="flex justify-between items-start gap-4 max-md:flex-col-reverse">
                <div className="md:w-1/3 mr-4">
                  <time className="text-sm text-gray-500 dark:text-gray-300">
                    {formatDateUS(blog.createdAt)}
                  </time>
                  <H3 className="mb-1">
                    <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </H3>
                  {blog.blocks && (
                    <time className="text-sm text-gray-500 dark:text-gray-300 mb-4 block">
                      {calculateReadTime(blog.blocks)} min read
                    </time>
                  )}

                  <p className="text-gray-600 dark:text-gray-200 mb-4 text-pretty">
                    {blog.description}
                  </p>
                  <div className="flex gap-2">
                    {blog.tags &&
                      blog.tags.map((tag) => {
                        return (
                          <span
                            key={tag}
                            className="px-3 py-1 font-medium bg-black text-white text-xs rounded-full capitalize
                            dark:bg-cPeach-dark dark:text-black
                            "
                          >
                            {tag}
                          </span>
                        );
                      })}
                  </div>
                </div>
                <Image
                  src={imgSrc}
                  alt={altText}
                  width={1920}
                  height={1080}
                  className="w-full md:h-[450px] object-cover blackNwhiteContast rounded-sm p-1
                  h-[200px]
                  "
                />
              </div>
            </div>
          </AnimationWrapper>
        )}
      </div>
    </div>
  );
}
