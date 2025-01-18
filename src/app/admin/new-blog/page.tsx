"use client";

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/lib/types/blog";
import { useState } from "react";
import {nanoid} from "nanoid"

export default function NewBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    { id: nanoid(), type: "text", content: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
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
      author: "Ryo",
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
    };

    try {
      console.log("Blog to be saved:", blog);

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save blog:", errorData);
        alert("Failed to save blog. Please try again.");
        return;
      }

      const responseData = await response.json();
      console.log("Blog saved successfully:", responseData);

      // Reset state
      setTitle("");
      setDescription("");
      setTags([]);
      setBlocks([{ id: "1", type: "text", content: "" }]);
      alert("Blog published successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred while saving the blog. Please try again.");
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
        <Input
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
          <Button variant="outline" onClick={() => console.log("Draft saved")}>
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>Publish</Button>
        </div>
      </div>
    </div>
  );
}
