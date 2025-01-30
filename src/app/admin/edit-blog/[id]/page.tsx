"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/lib/types/blog";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function EditBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  console.log("🚀 ~ EditBlog ~ id:", id)
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([{ id: "1", type: "text", content: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs?id=${id}`);
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
        alert("Failed to load blog data.");
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
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
    });
    console.log("🚀 ~ handleSubmit ~ response:", response)

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update blog:", errorData);
        alert("Failed to update blog. Please try again.");
        return;
      }

      const responseData = await response.json();
      console.log("Blog updated successfully:", responseData);
      alert("Blog updated successfully!");
      router.push(`/blogs/${id}`); // Redirect to the blog detail page
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Input
          className="text-4xl font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <Textarea
          className="mt-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blog Description"
        />
        <div className="flex items-center gap-2 mt-4">
          <Input
            className="flex-grow"
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
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500"
              >
                ×
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