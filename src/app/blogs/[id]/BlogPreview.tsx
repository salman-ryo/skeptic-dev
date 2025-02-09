"use client";
import { useSession } from "next-auth/react";
import { BlogDocument } from "@/lib/types/blog";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { Bar } from "@/components/common/Bar";
import ShareSection from "@/components/blog/ShareSection";
import { formatDateUS } from "@/utils/dateTime";
import UserAvatar from "@/components/common/UserAvatar";
import { TSessionUser } from "@/lib/types/user";

export default function BlogPreview({ blog }: { blog: BlogDocument }) {
  const { data: session } = useSession();
  const author =
    (session?.user as TSessionUser) || (blog.author as TSessionUser);

  return (
    <article className="w-full md:w-[70%] mx-auto p-6">
      <header className="mb-8">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex justify-start items-center gap-x-4">
            {blog.tags.map((tag, index) => (
              <div
                className="flex justify-center items-center gap-x-4"
                key={index}
              >
                <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300 capitalize">
                  {tag}
                </span>

                {blog.tags && index < blog.tags.length - 1 && (
                  <Bar className="w-[2px]" />
                )}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-5xl font-bold mt-8 mb-4">{blog.title}</h1>
        {blog.description && (
          <p className="text-cGray text-lg font-medium mb-4">
            {blog.description}
          </p>
        )}
        <div className="flex justify-start items-center space-x-6 font-medium mb-4">
          <div className="flex justify-start items-center space-x-2">
            <div className="flex gap-x-2">
              <UserAvatar className="size-12" user={author} />
              <div className="flex flex-col justify-start items-start text-gray-500">
                <span className="font-semibold">{author.name}</span>
                <span className="text-sm">Author</span>
              </div>
            </div>
          </div>
          <Bar />
          <span className="text-gray-500">
            {formatDateUS(new Date(blog.createdAt))}
          </span>
        </div>
        <ShareSection blogId={blog.id} />
      </header>
      {blog.blocks && (
        <div className="prose prose-lg max-w-none">
          {blog.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      )}
    </article>
  );
}
