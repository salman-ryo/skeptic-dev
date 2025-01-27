import { BlogDocument } from "@/lib/types/blog";
import { formatDateUS } from "@/utils/dateTime";
import { calculateReadTime } from "@/utils/text";
import Image from "next/image";

export function Hero({ blog }: { blog: BlogDocument }) {
  
  const imageBlock = blog.blocks?.find((block) => block.type === "image");
  const imgSrc =
    imageBlock?.metadata?.url ||
    "https://cdn.pixabay.com/photo/2024/05/16/20/21/digital-8766930_1280.png";
  const altText = imageBlock?.metadata?.alt || blog.title;
  return (
    <div className="bg-cGray-dark pb-12 px-16">
      <div className="container mx-auto">
        <div className="py-8 flex justify-start items-center">
          <h1 className="text-white text-9xl font-bold tracking-tight">
            SKEPTIC DEV
          </h1>
          <p className="text-gray-400 text-base font-bold ml-6">
            Eat
            <br />
            Sleep <br />
            Code <br />
            Repeat
          </p>
        </div>
        {blog && (
          <div className="bg-gray-100 rounded-md overflow-hidden p-10">
            <div className="flex justify-between items-start gap-4">
              <div className="w-1/3 mr-4">
                <time className="text-sm text-gray-500">
                  {formatDateUS(blog.createdAt)}
                </time>
                <h2 className="text-2xl font-semibold mb-1">{blog.title}</h2>
                {blog.blocks && (
                  <time className="text-sm text-gray-500 mb-4 block">
                    {calculateReadTime(blog.blocks)} min read
                  </time>
                )}

                <p className="text-gray-600 mb-4 text-pretty">
                  {blog.description}
                </p>
                <div className="flex gap-2">
                  {blog.tags &&
                    blog.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-black text-white text-xs rounded-full"
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
                className="w-full h-[450px] object-cover blackNwhite rounded-sm p-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
