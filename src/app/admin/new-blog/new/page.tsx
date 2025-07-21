"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Eye } from "lucide-react"
import { BlogPreview } from "@/components/blog/v2-editor/blog-preview"
import { BlogEditor } from "@/components/blog/v2-editor/blog-editor"

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [content, setContent] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const addTag = () => {
    const trimmed = currentTag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    const blogPost = { title, description, tags, content }
    console.log("Saving blog post:", blogPost)
    // TODO: save to backend
  }

  return (
    <div className="container mx-auto py-16 min-h-screen light:bg-white max-md:px-10">
      <div className="max-w-4xl mx-auto space-y-6 p-6 border-2 border-cyan-600 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Editor</h1>
          <div className="flex gap-2">
            <Button
              variant={isPreview ? "outline" : "default"}
              onClick={() => setIsPreview(false)}
              size="sm"
            >
              Edit
            </Button>
            <Button
              variant={isPreview ? "default" : "outline"}
              onClick={() => setIsPreview(true)}
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
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
              />
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
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 focus-visible:outline-none focus-visible:ring-0 border-2 border-gray-300 dark:border-cyan-800"
                />
                <Button size="sm" onClick={addTag}>
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

        <div className="">
          {isPreview ? (
            <div className="border-2 border-gray-300 dark:border-cyan-800 p-4 rounded">
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
                <BlogEditor content={content} onChange={setContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
