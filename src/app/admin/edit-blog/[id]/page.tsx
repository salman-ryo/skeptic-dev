"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/lib/types/blog";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";

export default function EditBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "text", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {successToast, errorToast} = useCustomToast()
  // Fetch the existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blogs?id=${id}`);
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
  }, [id]);

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
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
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
      router.push(`/blogs/${id}`); // Redirect to the blog detail page
    } catch (error) {
      errorToast("An error occurred while updating the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8
    max-md:px-10
    ">
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
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push(`/blogs/${id}`)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </div>
    </div>
  );
}
