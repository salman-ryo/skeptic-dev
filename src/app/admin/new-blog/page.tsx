"use client"
import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/lib/types/blog";
import { useState } from "react";

export default function NewBlog() {
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState<Block[]>([
      { id: "1", type: "text", content: "" }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const blog = {
        title,
        blocks,
        author: 'Ryo',
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true
      };
      
      console.log('Blog to be saved:', blog);
      try {
        console.log('Blog to be saved:', blog);
    
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
    
        // Optionally reset the state
        setTitle("");
        setBlocks([{ id: "1", type: "text", content: "" }]);
        alert("Blog published successfully!");
      } catch (error) {
        console.error("Error submitting blog:", error);
        alert("An error occurred while saving the blog. Please try again.");
      } finally{
        setIsSubmitting(false)
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
          
          <BlockEditor
            blocks={blocks}
            onBlocksChange={setBlocks} 
          />
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => console.log('Draft saved')}>
              Save Draft
            </Button>
            <Button onClick={handleSubmit}>
              Publish
            </Button>
          </div>
        </div>
      </div>
    );
  }