"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save } from "lucide-react";
import { BlogPreview } from "@/components/blog/v2-editor/blog-preview";
import { EditorModeToggle } from "@/components/blog/v2-editor/editor-mode-toggle";
import dynamic from "next/dynamic";

// Dynamic imports for better performance
const DynamicBlogEditor = dynamic(
  () => import("@/components/blog/v2-editor/blog-editor").then(mod => ({ default: mod.BlogEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-lg bg-background text-foreground light:border-gray-400 min-h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    )
  }
);

export default function BlogEditorScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addTag = () => {
    const trimmed = currentTag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) { // Limit to 10 tags
      setTags([...tags, trimmed]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }
    
    setIsSaving(true);
    const blogPost = { title, description, tags, content };
    console.log("Saving blog post:", blogPost);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // TODO: save to backend
  };

  const handleToggleMode = (preview: boolean) => {
    setIsPreview(preview);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="container mx-auto py-16 min-h-screen light:bg-white max-md:px-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Editor</h1>
          <div className="flex items-center gap-4">
            <EditorModeToggle
              isPreview={isPreview}
              onToggle={handleToggleMode}
            />
            <Button 
              onClick={handleSave} 
              size="sm" 
              className="ml-2" 
              disabled={isSaving || !title.trim() || !content.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {!isPreview && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="mt-1 focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
                maxLength={100}
              />
              <div className="text-sm text-muted-foreground text-right">
                {title.length}/100
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description..."
                className="mt-1 focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
                rows={3}
                maxLength={300}
              />
              <div className="text-sm text-muted-foreground text-right">
                {description.length}/300
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags ({tags.length}/10)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={handleKeyPress}
                  className="flex-1 focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
                  maxLength={20}
                  disabled={tags.length >= 10}
                />
                <Button 
                  size="sm" 
                  onClick={addTag}
                  disabled={!currentTag.trim() || tags.includes(currentTag.trim()) || tags.length >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1 bg-gray-200 text-gray-700 dark:bg-cPeach-dark dark:text-black"
                    >
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="md:w-[70%] md:mx-auto mt-6">
        {isPreview ? (
          <div className="border border-gray-300 dark:border-cyan-800 p-4 rounded">
            <BlogPreview
              title={title}
              description={description}
              tags={tags}
              content={content}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-base font-medium">Content</Label>
            <DynamicBlogEditor content={content} onChange={setContent} />
          </div>
        )}
      </div>
    </div>
  );
}
