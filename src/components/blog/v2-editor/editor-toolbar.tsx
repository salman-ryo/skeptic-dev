"use client";

import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  ImageIcon,
  Youtube as YoutubeIcon,
  Twitter,
  Minus,
  Type,
  Heading1,
  Heading2,
  Highlighter,
} from "lucide-react";
import { useState, useCallback } from "react";
import { LinkBubbleButton } from "./link-bubble-button";
import { languageOptions } from "@/config/blog/editor/codeFormats";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  // Media dialog states
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  
  // Dialog open states
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [isTwitterDialogOpen, setIsTwitterDialogOpen] = useState(false);

  const addImage = useCallback(() => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ 
        src: imageUrl.trim(), 
        alt: imageAlt.trim() || undefined 
      }).run();
      
      // Reset form and close dialog
      setImageUrl("");
      setImageAlt("");
      setIsImageDialogOpen(false);
    }
  }, [editor, imageUrl, imageAlt]);

  const addYoutube = useCallback(() => {
    if (youtubeUrl.trim()) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl.trim() }).run();
      
      // Reset form and close dialog
      setYoutubeUrl("");
      setIsYoutubeDialogOpen(false);
    }
  }, [editor, youtubeUrl]);

  const addTwitter = useCallback(() => {
    if (twitterUrl.trim()) {
      editor.chain().focus().setTwitterEmbed({ url: twitterUrl.trim() }).run();
      
      // Reset form and close dialog
      setTwitterUrl("");
      setIsTwitterDialogOpen(false);
    }
  }, [editor, twitterUrl]);

  const addCodeBlock = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "codeBlock",
        attrs: { language: codeLanguage },
      })
      .run();
  }, [editor, codeLanguage]);

  // Handle keyboard shortcuts for dialogs
  const handleImageKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addImage();
    }
  }, [addImage]);

  const handleYoutubeKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addYoutube();
    }
  }, [addYoutube]);

  const handleTwitterKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTwitter();
    }
  }, [addTwitter]);

  // Group languages by category for better organization
  const groupedLanguages = languageOptions.reduce(
    (acc, lang) => {
      if (!acc[lang.category]) {
        acc[lang.category] = [];
      }
      acc[lang.category].push(lang);
      return acc;
    },
    {} as Record<string, typeof languageOptions>
  );

  return (
    <div className="dark:bg-slate-950 bg-gray-300 border-b border-border p-2 flex flex-wrap gap-1 items-center rounded-t-lg">
      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().toggleUnderline()}
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("strike") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("highlight") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          title="Highlight"
        >
          <Highlighter className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("code") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings */}
      <div className="flex items-center gap-1">
        <Button
          variant={editor.isActive("paragraph") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Paragraph"
        >
          <Type className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists and Quote */}
      <div className="flex items-center gap-1">
        <Button
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Enhanced Code Block with Language Selection */}
      <div className="flex items-center gap-2">
        <Select value={codeLanguage} onValueChange={setCodeLanguage}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Select language..." />
          </SelectTrigger>
          <SelectContent className="max-h-80 overflow-y-auto">
            {/* Separator */}
            <div className="px-2 py-1">
              <div className="h-px bg-border" />
            </div>

            {/* All languages grouped by category */}
            {Object.entries(groupedLanguages).map(([category, languages]) => (
              <div key={category}>
                <div
                  className="px-2 py-1 text-sm font-semibold text-muted-foreground tracking-wide border-t border-b border-black w-full text-center my-2
                dark:bg-slate-950 dark:text-cyan-400 dark:border-cyan-400
                "
                >
                  {category}
                </div>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="cursor-pointer">
                    {lang.label}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={addCodeBlock} title="Insert Code Block">
          Code +
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Media and Links */}
      <div className="flex items-center gap-1">
        {/* Enhanced Image Dialog */}
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Add Image">
              <ImageIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL *</Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={handleImageKeyDown}
                  placeholder="https://example.com/image.jpg"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-alt">Alt Text (Optional)</Label>
                <Input
                  id="image-alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  onKeyDown={handleImageKeyDown}
                  placeholder="Description of the image for accessibility"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={addImage} 
                  className="flex-1"
                  disabled={!imageUrl.trim()}
                >
                  Add Image
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsImageDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <LinkBubbleButton editor={editor} />

        {/* Enhanced YouTube Dialog */}
        <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Add YouTube Video">
              <YoutubeIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add YouTube Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">YouTube URL</Label>
                <Input
                  id="youtube-url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyDown={handleYoutubeKeyDown}
                  placeholder="https://www.youtube.com/watch?v=..."
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={addYoutube} 
                  className="flex-1"
                  disabled={!youtubeUrl.trim()}
                >
                  Add Video
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsYoutubeDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Twitter Dialog */}
        <Dialog open={isTwitterDialogOpen} onOpenChange={setIsTwitterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Add Twitter Embed">
              <Twitter className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Twitter Embed</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-url">Twitter URL</Label>
                <Input
                  id="twitter-url"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  onKeyDown={handleTwitterKeyDown}
                  placeholder="https://twitter.com/user/status/..."
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={addTwitter} 
                  className="flex-1"
                  disabled={!twitterUrl.trim()}
                >
                  Add Tweet
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsTwitterDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setDivider().run()}
          title="Add Divider"
        >
          <Minus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
