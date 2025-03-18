"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block, BlogDocument } from "@/lib/types/blog";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import BlogPreview from "@/components/pages/blogs/BlogPreview";
import { EyeIcon, Save, X, XIcon } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import SimpleTooltip from "@/components/common/SimpleTooltip";
import ControlEditorNavigation from "@/components/blog/ControlEditorNavigation";
import { BlogValidationSchema } from "@/lib/validation/blog";
import { useValidation } from "@/hooks/useValidation";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: nanoid(), type: "text", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { successToast, errorToast } = useCustomToast();
  const { errors, validateForm, validateField, resetErrors } = useValidation(BlogValidationSchema);
  console.log("🚀 ~ NewBlog ~ errors:", errors)

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setNewTag("");
      validateField('tags', newTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    validateField('tags', newTags);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    const blogData = {
      title: title.trim(),
      description: description.trim(),
      tags,
      blocks,
    };
    
    if (!validateForm(blogData)) {
      errorToast("Please fix the validation errors");
      return;
    }
    
    // Then add createdAt and updatedAt before sending to the server
    const blog = { ...blogData, createdAt: new Date(), updatedAt: new Date() };
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      if (!response.ok) throw new Error("Failed to save blog");

      // Reset form
      setTitle("");
      setDescription("");
      setTags([]);
      setBlocks([{ id: nanoid(), type: "text", content: "" }]);
      resetErrors();
      successToast("Blog published successfully!");
    } catch (error) {
      errorToast("An error occurred while saving the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview blog object
  // @ts-ignore
  const previewBlog: BlogDocument = {
    title,
    description,
    tags,
    blocks,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="container mx-auto py-16 min-h-screen light:bg-white max-md:px-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => validateField('title', title.trim())}
            placeholder="Blog Title"
            className="focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => validateField('description', description.trim())}
            placeholder="Blog Description"
            className="focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag"
              className="flex-grow focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
            />
            <Button onClick={handleAddTag}>Add</Button>
          </div>
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full flex items-center gap-2 dark:bg-cPeach-dark dark:text-black"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 dark:text-black hover:scale-110 transition"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Block Editor */}
        <div className="space-y-2">
          <BlockEditor blocks={blocks} onBlocksChange={setBlocks} />
          {errors.blocks && <p className="text-red-500 text-sm">{errors.blocks}</p>}
        </div>

        {/* Mobile Controls */}
        <div className="hidden max-md:flex justify-end gap-4">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
          <button
            className="p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
            onClick={() => setIsPreviewOpen(true)}
          >
            <EyeIcon size={24} />
          </button>
        </div>
      </div>

      {/* Desktop Floating Controls */}
      <div className="max-md:hidden fixed top-1/2 -translate-y-1/2 right-10 flex flex-col justify-center items-center gap-y-6 p-2 dark:bg-black rounded-full border-2 border-gray-400 dark:border-gray-800">
        <SimpleTooltip content="Preview Blog">
          <button
            className="dark:text-blue-500 light:hover:text-blue-500 hover:scale-125 transition-all duration-300"
            onClick={() => setIsPreviewOpen(true)}
          >
            <EyeIcon size={28} />
          </button>
        </SimpleTooltip>
        <SimpleTooltip content="Save Blog">
          <button
            className="dark:text-green-500 light:hover:text-green-500 hover:scale-125 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Save size={28} />
          </button>
        </SimpleTooltip>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bgSpaceGradient w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 p-1 bg-gray-300 rounded-full hover:bg-gray-400 transition dark:bg-black"
              onClick={() => setIsPreviewOpen(false)}
            >
              <XIcon size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Blog Preview</h2>
            <div className="max-h-[80dvh] overflow-auto p-2 border rounded max-md:max-h-[92vh] dark:border-cyan-800">
              <BlogPreview blog={previewBlog} />
            </div>
          </div>
        </div>
      )}

      <ControlEditorNavigation {...{ title, description, tags, blocks }} />
    </div>
  );
}