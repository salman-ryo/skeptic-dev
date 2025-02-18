"use client";
import { FC, Key } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BlogDocument } from "@/lib/types/blog";
import { useRandomImage } from "@/hooks/useRandomImage";
import { formatDateUS } from "@/utils/dateTime";
import { calculateReadTime, limitWords } from "@/utils/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Eye } from "lucide-react";
import SimpleTooltip from "../common/SimpleTooltip";
import Image from "next/image";

interface BlogCardProps {
  blog: BlogDocument; // Using BlogDocument as the type
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const { _id, title, description, tags, blocks, createdAt } = blog;
  const fallbackImg = useRandomImage();

  // Extract image from blocks if it exists
  const imageBlock = blocks?.find((block) => block.type === "image");
  const imgSrc = imageBlock?.metadata?.url || fallbackImg.url;
  const altText = imageBlock?.metadata?.alt || "Blog image";

  return (
    <Card className="max-md:w-[360px] w-[400px] min-h-[520px] flex-shrink-0 bg-white h-full border-2 rounded-md shadow-md border-cGray-light snap-center
    dark:bg-slate-950 dark:border-purple-600 dark:shadow-blue-400
    ">
      <CardContent className="p-6">
        <div className="mb-4">
          <Image
            src={imgSrc}
            alt={altText}
            width={900}
            height={600}
            className="w-full h-[210px] object-cover rounded-sm blackNwhiteContast"
          />
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            {tags?.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="rounded-full bg-cGray-dark text-white hover:text-cGray-dark hover:bg-cGray-light px-2.5 py-1 select-none capitalize transition-colors duration-500
                dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:hover:text-white
                "
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-gray-500 
          dark:text-gray-300
          "
          >{formatDateUS(createdAt)}</p>
          <SimpleTooltip content={title}>
            <Link href={`/blogs/${_id}`} className="block">
              <h3 className="text-xl font-bold hover:text-gray-700 text-left text-pretty
              dark:text-gray-200 dark:hover:text-cyan-400 transition-colors duration-300
              ">
                {limitWords(title, 9)}
              </h3>
            </Link>
          </SimpleTooltip>
          <div className="flex justify-start items-center gap-x-4 text-gray-500 dark:text-gray-300">
            {blog.blocks && <p>{calculateReadTime(blog.blocks)} min read</p>}
            {blog.views > 0 && (
              <div className="flex justify-center items-center gap-x-1">
                <Eye size={20} />
                {blog.views}
              </div>
            )}
          </div>
          {description && (
            <p className="text-gray-600 dark:text-gray-200">{limitWords(description, 15)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
