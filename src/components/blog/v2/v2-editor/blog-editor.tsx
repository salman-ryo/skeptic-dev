"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { createLowlight, common } from "lowlight";
import { DraggableToolbar } from "./draggable-toolbar";
import { TwitterExtension } from "./extensions/twitter-extension";
import { DividerExtension } from "./extensions/divider-extension";
import "./editor-styles.css";
import { BubbleMenuComponent } from "./bubble-menu-component";
import { useState, useEffect } from "react";

const lowlight = createLowlight(common);

type Position = "left" | "top" | "right";

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  toolbarPosition: "left" | "top";
  onToolbarPositionChange: (position: "left" | "top") => void;
  actionsMenuPosition: Position;
}

export function BlogEditor({
  content,
  onChange,
  toolbarPosition,
  onToolbarPositionChange,
  actionsMenuPosition,
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Highlight.configure({
        multicolor: false,
        HTMLAttributes: {
          class: "bg-yellow-200 dark:bg-yellow-800 px-1 rounded",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            "w-full max-h-[500px] object-cover rounded-lg border dark:border-gray-900 max-sm:h-[260px] max-md:h-[300px]",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 hover:text-blue-800 underline cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: "rounded-lg mx-auto",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "code-block-wrapper",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      TwitterExtension,
      DividerExtension,
    ],
    immediatelyRender: false,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 rounded-md text-gray-50 light:text-black",
      },
    },
  });

  if (!editor) {
    return (
      <div className="border rounded-lg bg-background text-foreground light:border-gray-400 min-h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <>
      <DraggableToolbar
        editor={editor}
        position={toolbarPosition}
        onPositionChange={onToolbarPositionChange}
        otherMenuPosition={actionsMenuPosition}
      />

      <div className="border rounded-lg bg-background text-foreground light:border-gray-400">
        <div className="relative h-[75dvh] overflow-y-scroll pb-10">
          <EditorContent editor={editor} />
          {editor && <BubbleMenuComponent editor={editor} />}
        </div>
      </div>
    </>
  );
}
