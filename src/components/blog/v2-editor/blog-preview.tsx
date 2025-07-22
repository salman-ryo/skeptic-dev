// src/components/BlogPreview.tsx

"use client"; // Required because we are using the useSession hook

import { useSession } from "next-auth/react";
import { TSessionUser } from "@/lib/types/user";
import { Bar } from "@/components/common/Bar";
import UserAvatar from "@/components/common/UserAvatar";
import ShareSection from "@/components/blog/ShareSection";
import { formatDateUS } from "@/utils/dateTime";
import { ContentRenderer } from "./ContentRenderer";

interface BlogPreviewProps {
  title: string;
  description: string;
  tags: string[];
  content: string; // The raw HTML content
  author?: TSessionUser;
  createdAt?: Date | string;
  slug?: string;
}

export function BlogPreview({
  title,
  description,
  tags,
  content,
  createdAt = new Date(),
  slug = "random stuff",
  author,
}: BlogPreviewProps) {
  const { data: session } = useSession();

  // Use the author from the session if available, otherwise use the passed author prop
  const blogAuthor = (session?.user as TSessionUser) || author;

  if (!blogAuthor) {
    // Handle the case where author is not available
    return <div>Loading author information or author not found...</div>;
  }

  return (
    <main className="w-full">
      <article className="w-full md:w-[90%] mx-auto p-6">
        <header className="mb-8">
          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <div className="flex justify-start items-center gap-x-4 mb-8">
              {tags.map((tag, index) => (
                <div className="flex justify-center items-center gap-x-4" key={tag}>
                  <span className="text-lg font-medium text-gray-500 hover:text-gray-700 transition-colors duration-300 capitalize dark:text-cyan-400 dark:hover:text-cyan-300">
                    {tag}
                  </span>
                  {index < tags.length - 1 && <Bar className="w-[2px]" />}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 dark:text-gray-200">
            {title || "Untitled Blog Post"}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg font-medium mb-6 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}

          {/* Author and Date Section */}
          <div className="flex justify-start items-center space-x-6 font-medium mb-6">
            <div className="flex justify-start items-center space-x-3">
              <UserAvatar className="size-12" user={blogAuthor} />
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold text-gray-800 dark:text-blue-400">
                  {blogAuthor.name || "Anonymous"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Author
                </span>
              </div>
            </div>
            <Bar />
            <span className="text-gray-500 dark:text-gray-400">
              {formatDateUS(new Date(createdAt))}
            </span>
          </div>

          {/* Share Section */}
          <ShareSection slug={slug} />
        </header>

        {/* The Content, now rendered with our powerful ContentRenderer */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ContentRenderer
            htmlContent={content || "<p>Start writing to see the preview...</p>"}
          />
        </div>
      </article>
    </main>
  );
}
