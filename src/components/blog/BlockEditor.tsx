// components/BlockEditor.tsx
"use client";
import { useState, useEffect } from "react";
import { Plus, ArrowUp, ArrowDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Block, BlockType } from "@/lib/types/blog";
import { nanoid } from "nanoid";

interface BlockEditorProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
}

export const BlockEditor = ({ blocks, onBlocksChange }: BlockEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addBlock = (index: number) => {
    const newBlock: Block = {
      id: nanoid(),
      type: "text",
      content: "",
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onBlocksChange(newBlocks);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    onBlocksChange(
      blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      onBlocksChange(blocks.filter((block) => block.id !== id));
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    onBlocksChange(newBlocks);
  };

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case "text":
        return (
          <RichTextEditor
            content={block.content}
            onChange={(content) => updateBlock(block.id, { content })}
          />
        );

      case "code":
        return (
          <div className="space-y-2">
            <Select
              value={block.metadata?.language || "javascript"}
              onValueChange={(language) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, language },
                })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="jsx">JSX</SelectItem>
                <SelectItem value="tsx">TSX</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectContent>
            </Select>
            <textarea
              className="w-full min-h-[200px] font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={block.content}
              onChange={(e) =>
                updateBlock(block.id, { content: e.target.value })
              }
              placeholder="Enter code here..."
              spellCheck={false}
            />
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            <Input
              placeholder="Image URL"
              className="focus-visible:outline-none focus-visible:ring-0"
              value={block.metadata?.url || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, url: e.target.value },
                })
              }
            />
            <Input
              placeholder="Alt text"
              className="focus-visible:outline-none focus-visible:ring-0"
              value={block.metadata?.alt || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, alt: e.target.value },
                })
              }
            />
            {block.metadata?.url && (
              <img
                src={block.metadata.url}
                alt={block.metadata.alt}
                className="max-h-40 object-cover rounded border dark:border-white"
              />
            )}
          </div>
        );

      case "youtube":
        return (
          <div className="space-y-2">
            <Input
              className="focus-visible:outline-none focus-visible:ring-0"
              placeholder="YouTube Video ID"
              value={block.metadata?.embedId || ""}
              onChange={(e) =>
                updateBlock(block.id, {
                  metadata: { ...block.metadata, embedId: e.target.value },
                })
              }
            />
            {block.metadata?.embedId && (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${block.metadata.embedId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded"
                />
              </div>
            )}
          </div>
        );

      case "divider":
        return <hr className="my-2" />;

      default:
        return (
          <textarea
            className="w-full bg-transparent border-none focus:outline-none resize-none"
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            rows={block.type.startsWith("heading") ? 1 : 3}
            placeholder={`Enter ${block.type} content...`}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Card key={block.id} className="p-4 relative
        max-md:p-3
        ">
          <div className="flex gap-4 
          max-md:flex-col">
            <Select
              value={block.type}
              onValueChange={(value: BlockType) =>
                updateBlock(block.id, { type: value })
              }
            >
              <SelectTrigger className="w-32 max-md:w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="heading1">Heading 1</SelectItem>
                <SelectItem value="heading2">Heading 2</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="quote">Quote</SelectItem>
                <SelectItem value="divider">Divider</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1">{renderBlockContent(block)}</div>
          </div>
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex justify-start items-center gap-x-2 w-24">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, "up")}
              >
                {" "}
                <ArrowUp className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, "down")}
              >
                {" "}
                <ArrowDown className="h-4 w-4" />{" "}
              </Button>
            </div>
            {blocks.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                title="Delete Block"
                onClick={() => deleteBlock(block.id)}
              >
                <Trash />
              </Button>
            )}
          </div>
          <div className="absolute -left-10 top-1/2 -translate-y-1/2">
            <Button variant="ghost" size="sm" onClick={() => addBlock(index)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
