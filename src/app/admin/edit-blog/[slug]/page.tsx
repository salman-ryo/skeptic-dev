"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/lib/types/blog";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { EyeIcon, Save, X, XIcon } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import SimpleTooltip from "@/components/common/SimpleTooltip";
import BlogPreview from "@/components/pages/blogs/BlogPreview";
import ControlEditorNavigation from "@/components/blog/ControlEditorNavigation";

export default function EditBlog() {
  const { slug } = useParams(); // Get the blog ID from the URL
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "text", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { successToast, errorToast } = useCustomToast();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Toggle state

  // Fetch the existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/public/blogs?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags);
        setBlocks(data.blocks);
      } catch (error) {
        console.error("Error fetching blog:", error);
        errorToast("Failed to load blog data.");
      }
    };

    fetchBlog();
  }, [slug]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const updatedBlog = {
      title,
      description,
      tags,
      blocks,
      updatedAt: new Date(),
    };

    try {
      const response = await fetch(`/api/admin/blogs?slug=${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update blog:", errorData);
        errorToast("Failed to update blog. Please try again.");
        return;
      }

      await response.json();
      successToast("Blog updated successfully!");
      router.push(`/blogs/${slug}`); // Redirect to the blog detail page
    } catch (error) {
      errorToast(
        "An error occurred while updating the blog. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Construct a preview blog object
  // @ts-expect-error
  const previewBlog: BlogDocument = {
    title,
    description,
    tags,
    blocks,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div
      className="container mx-auto py-8
    max-md:px-10
    light:bg-white
    "
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Input
          className="focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <Textarea
          className="mt-4 focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blog Description"
        />
        <div className="flex items-center gap-2 mt-4">
          <Input
            className="flex-grow focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <Button onClick={handleAddTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full flex items-center gap-2
              dark:bg-cPeach-dark dark:text-black
              "
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 dark:text-black"
              >
                <X className="hover:scale-110" size={20} />
              </button>
            </div>
          ))}
        </div>
        <BlockEditor blocks={blocks} onBlocksChange={setBlocks} />
        <div className="hidden max-md:flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/blogs/${slug}`)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
          <button
            className="p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
            onClick={() => setIsPreviewOpen(true)}
          >
            <EyeIcon size={24} />
          </button>
        </div>
      </div>
      {/* Side Panel for Preview, Save */}
      <div className="max-md:hidden fixed top-1/2 -translate-y-1/2 right-10 flex flex-col justify-center items-center gap-y-6 p-2 dark:bg-black rounded-full border-2 border-gray-400 dark:border-gray-800">
        <SimpleTooltip content="Preview Blog">
          <button
            className="dark:text-blue-500 light:hover:text-blue-500 hover:scale-125 transition-all duration-300"
            onClick={() => setIsPreviewOpen(true)}
          >
            <EyeIcon size={28}/>
          </button>
        </SimpleTooltip>
        <SimpleTooltip content="Save Blog">
          <button
            className="dark:text-green-500 light:hover:text-green-500 hover:scale-125 transition-all duration-300"
            onClick={handleSubmit}
          >
            <Save size={28}/>
          </button>
        </SimpleTooltip>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bgSpaceGradient w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-1 bg-gray-300 rounded-full hover:bg-gray-400 transition
                        dark:bg-black
                        "
              onClick={() => setIsPreviewOpen(false)}
            >
              <XIcon size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Blog Preview</h2>
            <div
              className="max-h-[80dvh] overflow-auto p-2 border rounded
                      max-md:max-h-[92vh]
                      dark:border-cyan-800
                      "
            >
              <BlogPreview blog={previewBlog} />
            </div>
          </div>
        </div>
      )}

      <ControlEditorNavigation {...{ title, description, tags, blocks }} />
    </div>
  );
}
