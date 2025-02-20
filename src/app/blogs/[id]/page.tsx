import { Block, BlogDocument } from "@/lib/types/blog";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { Bar } from "@/components/common/Bar";
import ShareSection from "@/components/blog/ShareSection";
import { formatDateUS } from "@/utils/dateTime";
import UserAvatar from "@/components/common/UserAvatar";
import { getBlogData } from "@/actions/blog";



export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const blog: BlogDocument = await getBlogData(id);

  if (!blog) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full light:bg-white">
      {blog && (
        <article className="w-full md:w-[70%] mx-auto p-6">
          <header className="mb-8">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex justify-start items-center gap-x-4">
                {blog.tags.map((tag, index) => (
                  <div
                    className="flex justify-center items-center gap-x-4"
                    key={index}
                  >
                    <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300 capitalize dark:text-cyan-400">
                      {tag}
                    </span>
                    {index < (blog.tags as string[]).length - 1 && (
                      <Bar className="w-[2px]" />
                    )}
                  </div>
                ))}
              </div>
            )}
            <h1 className="text-5xl font-bold mt-8 mb-4 dark:text-gray-200">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-cGray text-lg font-medium mb-4 dark:text-cGray-light">
                {blog.description}
              </p>
            )}
            <div className="flex justify-start items-center space-x-6 font-medium mb-4">
              {/* Blog author */}
              {blog && blog.author && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="flex gap-x-2">
                    <UserAvatar className="size-12" user={blog.author} />
                    <div className="flex flex-col justify-start items-start text-gray-500">
                      <span className="font-semibold dark:text-blue-400">
                        {blog?.author?.name || "Anonymous"}
                      </span>
                      <span className="text-sm dark:text-gray-400">Author</span>
                    </div>
                  </div>
                </div>
              )}
              <Bar />
              <span className="text-gray-500 dark:text-gray-400">
                {formatDateUS(new Date(blog.createdAt))}
              </span>
            </div>
            <ShareSection blogId={id} />
          </header>
          {blog.blocks && (
            <div className="prose prose-lg max-w-none">
              {blog.blocks.map((block: Block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </div>
          )}
        </article>
      )}
    </main>
  );
}
