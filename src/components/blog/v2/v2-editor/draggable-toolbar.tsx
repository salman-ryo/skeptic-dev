"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  GripVertical,
  Code2,
} from "lucide-react";
import { LinkBubbleButton } from "./link-bubble-button";
import { languageOptions } from "@/config/blog/editor/codeFormats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Position = "left" | "top";

interface DraggableToolbarProps {
  editor: Editor;
  position: Position;
  onPositionChange: (position: Position) => void;
  otherMenuPosition: Position | "right";
}

// Minimum pixels to move before updating position (prevents jittery movements)
const DRAG_THRESHOLD = 3;

export function DraggableToolbar({
  editor,
  position,
  onPositionChange,
  otherMenuPosition,
}: DraggableToolbarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState<Position>(position);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isCodeHovered, setIsCodeHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastUpdatePos = useRef({ x: 0, y: 0 });

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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!toolbarRef.current) return;

      const rect = toolbarRef.current.getBoundingClientRect();

      // Calculate current screen position
      const initialX = rect.left;
      const initialY = rect.top;

      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Initialize position to current location (prevents jump)
      setCurrentPosition({ x: initialX, y: initialY });

      setOriginalPosition(position);
      setIsDragging(true);
      lastUpdatePos.current = { x: e.clientX, y: e.clientY };
    },
    [position]
  );

  useEffect(() => {
    if (!isDragging) {
      setCurrentPosition({ x: 0, y: 0 });
      lastUpdatePos.current = { x: 0, y: 0 };
      return;
    }

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      // Calculate distance from last update
      const deltaX = Math.abs(lastX - lastUpdatePos.current.x);
      const deltaY = Math.abs(lastY - lastUpdatePos.current.y);

      // Only update if movement exceeds threshold
      if (deltaX < DRAG_THRESHOLD && deltaY < DRAG_THRESHOLD) {
        return;
      }

      // Update last position
      lastUpdatePos.current = { x: lastX, y: lastY };

      // Cancel any pending frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame
      rafRef.current = requestAnimationFrame(() => {
        setCurrentPosition({
          x: lastX - dragOffset.x,
          y: lastY - dragOffset.y,
        });
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Detect snap zones
      const isTopZone = e.clientY < 100;
      const isLeftZone = e.clientX < 100 && !isTopZone;

      let newPosition: Position = originalPosition;

      if (isTopZone && otherMenuPosition !== "top") {
        newPosition = "top";
      } else if (isLeftZone) {
        newPosition = "left";
      }

      // Only update position if it's a valid drop zone
      if (newPosition !== originalPosition) {
        onPositionChange(newPosition);
      }

      setIsDragging(false);
      setCurrentPosition({ x: 0, y: 0 });
      lastUpdatePos.current = { x: 0, y: 0 };
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    dragOffset,
    onPositionChange,
    otherMenuPosition,
    originalPosition,
  ]);

  const setAlignment = useCallback(
    (alignment: string) => {
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor]
  );

  const addImage = useCallback(() => {
    if (imageUrl.trim()) {
      editor
        .chain()
        .setImage({
          src: imageUrl.trim(),
          alt: imageAlt.trim() || undefined,
        })
        .createParagraphNear()
        .run();

      setImageUrl("");
      setImageAlt("");
      setIsImageDialogOpen(false);
    }
  }, [editor, imageUrl, imageAlt]);

  const addYoutube = useCallback(() => {
    if (youtubeUrl.trim()) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl.trim() }).run();
      setYoutubeUrl("");
      setIsYoutubeDialogOpen(false);
    }
  }, [editor, youtubeUrl]);

  const addTwitter = useCallback(() => {
    if (twitterUrl.trim()) {
      editor.chain().focus().setTwitterEmbed({ url: twitterUrl.trim() }).run();
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

  const handleImageKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addImage();
      }
    },
    [addImage]
  );

  const handleYoutubeKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addYoutube();
      }
    },
    [addYoutube]
  );

  const handleTwitterKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addTwitter();
      }
    },
    [addTwitter]
  );

  const groupedLanguages = useMemo(
    () =>
      languageOptions.reduce(
        (acc, lang) => {
          if (!acc[lang.category]) {
            acc[lang.category] = [];
          }
          acc[lang.category].push(lang);
          return acc;
        },
        {} as Record<string, typeof languageOptions>
      ),
    []
  );

  const isHorizontal = position === "top";
  const currentLanguageLabel = useMemo(
    () =>
      languageOptions.find((l) => l.value === codeLanguage)?.label ||
      codeLanguage,
    [codeLanguage]
  );

  // Calculate inline styles for dragging using transform instead of left/top
  const dragStyles = useMemo(() => {
    if (!isDragging) return {};

    return {
      transform: `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`,
      position: "fixed" as const,
      left: 0,
      top: 0,
      zIndex: 9999,
      willChange: "transform",
    };
  }, [isDragging, currentPosition.x, currentPosition.y]);

  const containerClasses = useMemo(
    () =>
      `
    fixed z-50 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-cyan-400 
    rounded-lg shadow-2xl p-2 transition-all duration-300
    ${isDragging ? "cursor-grabbing" : "cursor-default"}
    ${
      isHorizontal
        ? "top-0 left-1/2 -translate-x-1/2 w-auto max-w-[95vw] overflow-x-auto"
        : `top-32 left-4 ${isCodeHovered ? "w-48" : "w-16"} max-h-[calc(100vh-200px)] overflow-y-auto`
    }
  `.trim(),
    [isDragging, isHorizontal, isCodeHovered]
  );

  return (
    <TooltipProvider>
      <div
        ref={toolbarRef}
        className={`${containerClasses} ${isHorizontal ? "" : ""}`}
        style={dragStyles}
      >
        {/* Drag Handle */}
        <div
          className={`flex ${isHorizontal ? "absolute top-1 left-1" : "mb-2"} items-center justify-center mb-2 cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-slate-800 rounded`}
          onMouseDown={handleMouseDown}
        >
          <Tooltip>
            <TooltipTrigger>
              <GripVertical className="w-5 h-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>Drag the Toolbar</TooltipContent>
          </Tooltip>
        </div>

        <div
          className={`flex ${
            isHorizontal
              ? "flex-row flex-wrap justify-center items-center"
              : "flex-col items-center"
          } gap-2`}
        >
          {/* Text Formatting */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-1`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("bold") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className="w-9 h-9 p-0"
                >
                  <Bold className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold (Ctrl+B)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("italic") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className="w-9 h-9 p-0"
                >
                  <Italic className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic (Ctrl+I)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("underline") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  disabled={!editor.can().toggleUnderline()}
                  className="w-9 h-9 p-0"
                >
                  <Underline className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline (Ctrl+U)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("strike") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className="w-9 h-9 p-0"
                >
                  <Strikethrough className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("highlight") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  className="w-9 h-9 p-0"
                >
                  <Highlighter className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("code") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className="w-9 h-9 p-0"
                >
                  <Code className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Inline Code</TooltipContent>
            </Tooltip>
          </div>

          <Separator
            orientation={isHorizontal ? "vertical" : "horizontal"}
            className={isHorizontal ? "h-8" : "w-10"}
          />

          {/* Headings */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-1`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("paragraph") ? "default" : "ghost"}
                  size="sm"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className="w-9 h-9 p-0"
                >
                  <Type className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Paragraph</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <Heading1 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <Heading2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>
          </div>

          <Separator
            orientation={isHorizontal ? "vertical" : "horizontal"}
            className={isHorizontal ? "h-8" : "w-10"}
          />

          {/* Text Alignment */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-1`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setAlignment("left")}
                  className="w-9 h-9 p-0"
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive({ textAlign: "center" })
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => setAlignment("center")}
                  className="w-9 h-9 p-0"
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive({ textAlign: "right" })
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => setAlignment("right")}
                  className="w-9 h-9 p-0"
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    editor.isActive({ textAlign: "justify" })
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() => setAlignment("justify")}
                  className="w-9 h-9 p-0"
                >
                  <AlignJustify className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Justify</TooltipContent>
            </Tooltip>
          </div>

          <Separator
            orientation={isHorizontal ? "vertical" : "horizontal"}
            className={isHorizontal ? "h-8" : "w-10"}
          />

          {/* Lists and Quote */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-1`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("bulletList") ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("orderedList") ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editor.isActive("blockquote") ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <Quote className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quote</TooltipContent>
            </Tooltip>
          </div>

          <Separator
            orientation={isHorizontal ? "vertical" : "horizontal"}
            className={isHorizontal ? "h-8" : "w-10"}
          />

          {/* Code Block with Conditional Dynamic Width */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-2`}
            onMouseEnter={() => !isHorizontal && setIsCodeHovered(true)}
            onMouseLeave={() => !isHorizontal && setIsCodeHovered(false)}
          >
            <Select value={codeLanguage} onValueChange={setCodeLanguage}>
              <SelectTrigger
                className={`h-9 border border-gray-300 dark:border-purple-400 ${
                  isHorizontal ? "" : "transition-all duration-300"
                } ${isHorizontal ? "w-32" : isCodeHovered ? "w-40" : "w-9 px-1"}`}
                title={
                  isHorizontal || isCodeHovered
                    ? undefined
                    : currentLanguageLabel
                }
              >
                {isHorizontal || isCodeHovered ? (
                  <SelectValue placeholder="Language" />
                ) : (
                  <Code2 className="w-4 h-4 mx-auto" />
                )}
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {Object.entries(groupedLanguages).map(
                  ([category, languages]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                        {category}
                      </div>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </div>
                  )
                )}
              </SelectContent>
            </Select>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addCodeBlock}
                  className="w-9 h-9 p-0 shrink-0"
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Code Block</TooltipContent>
            </Tooltip>
          </div>

          <Separator
            orientation={isHorizontal ? "vertical" : "horizontal"}
            className={isHorizontal ? "h-8" : "w-10"}
          />

          {/* Media and Links */}
          <div
            className={`flex ${
              isHorizontal ? "flex-row" : "flex-col"
            } items-center gap-1`}
          >
            {/* Image Dialog */}
            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add Image</TooltipContent>
              </Tooltip>
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
                      placeholder="Description of the image"
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

            {/* YouTube Dialog */}
            <Dialog
              open={isYoutubeDialogOpen}
              onOpenChange={setIsYoutubeDialogOpen}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                      <YoutubeIcon className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add YouTube</TooltipContent>
              </Tooltip>
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

            {/* Twitter Dialog */}
            <Dialog
              open={isTwitterDialogOpen}
              onOpenChange={setIsTwitterDialogOpen}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add Twitter</TooltipContent>
              </Tooltip>
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

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setDivider()
                      .createParagraphNear()
                      .run()
                  }
                  className="w-9 h-9 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Divider</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Drop Zone Indicator */}
        {isDragging && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap bg-background px-2 py-1 rounded border">
            Drag to top or left
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
