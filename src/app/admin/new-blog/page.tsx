"use client"

import { BlockEditor } from "@/components/blog/BlockEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NewBlog() {
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState<Block[]>([
      { id: "1", type: "text", content: "" }
    ]);
  
    const handleSubmit = async () => {
      const blog = {
        title,
        blocks,
        author: 'Current User',
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true
      };
      
      console.log('Blog to be saved:', blog);
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