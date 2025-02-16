"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block, BlogDocument } from "@/lib/types/blog";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import BlogPreview from "@/app/blogs/[id]/BlogPreview";
import { CrossIcon, EyeIcon, X, XIcon } from "lucide-react";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: nanoid(), type: "text", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Toggle state

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

    const blog = {
      title,
      description,
      tags,
      blocks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      console.log("Blog to be saved:", blog);

      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save blog:", errorData);
        alert("Failed to save blog. Please try again.");
        return;
      }


      // Reset state
      setTitle("");
      setDescription("");
      setTags([]);
      setBlocks([{ id: nanoid(), type: "text", content: "" }]);
      alert("Blog published successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred while saving the blog. Please try again.");
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
    <div className="container mx-auto py-16 min-h-screen light:bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Blog Input Fields */}
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
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => console.log("Draft saved")}>
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>Publish</Button>
        </div>

        {/* Toggle Preview Button */}
        <button
          className="fixed top-1/2 -translate-y-1/2 right-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
          onClick={() => setIsPreviewOpen(true)}
          title="Preview Blog"
        >
          <EyeIcon size={24} />
        </button>

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
              <div className="max-h-[80vh] overflow-auto p-2 border rounded dark:border-black">
                <BlogPreview blog={previewBlog} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
