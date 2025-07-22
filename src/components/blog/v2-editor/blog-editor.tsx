"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Youtube from "@tiptap/extension-youtube"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline" // ✨ Import Underline
import { createLowlight, common } from "lowlight"
import { EditorToolbar } from "./editor-toolbar"
import { TwitterExtension } from "./extensions/twitter-extension"
import { DividerExtension } from "./extensions/divider-extension"
import "./editor-styles.css"
import { BubbleMenuComponent } from "./bubble-menu-component"

// Create lowlight instance with common languages
const lowlight = createLowlight(common)

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
}

export function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline, // ✨ Add the Underline extension here
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: "rounded-lg",
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
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 rounded-md text-gray-50 light:text-black",
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg bg-background text-foreground light:border-gray-400">
      <EditorToolbar editor={editor} />
      <div className="relative h-[75dvh] overflow-y-scroll">
        <EditorContent editor={editor} />
        {editor && <BubbleMenuComponent editor={editor} />}
      </div>
    </div>
  )
}
