"use client"

import { useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2 } from "lucide-react"
import { LinkBubbleButton } from "./link-bubble-button"

interface BubbleMenuComponentProps {
  editor: Editor
}

export function BubbleMenuComponent({ editor }: BubbleMenuComponentProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMenu = () => {
      const { selection } = editor.state
      const { from, to } = selection

      if (from === to) {
        // No selection, hide menu
        if (menuRef.current) {
          menuRef.current.style.display = "none"
        }
        return
      }

      // Show menu
      if (menuRef.current) {
        menuRef.current.style.display = "flex"

        // Position the menu
        const { view } = editor
        const start = view.coordsAtPos(from)
        const end = view.coordsAtPos(to)

        const editorRect = view.dom.getBoundingClientRect()
        const menuRect = menuRef.current.getBoundingClientRect()

        const left = Math.max(
          10,
          Math.min(window.innerWidth - menuRect.width - 10, (start.left + end.left) / 2 - menuRect.width / 2),
        )

        const top = start.top - menuRect.height - 10

        menuRef.current.style.position = "fixed"
        menuRef.current.style.left = `${left}px`
        menuRef.current.style.top = `${top}px`
        menuRef.current.style.zIndex = "50"
      }
    }

    editor.on("selectionUpdate", updateMenu)
    editor.on("transaction", updateMenu)

    return () => {
      editor.off("selectionUpdate", updateMenu)
      editor.off("transaction", updateMenu)
    }
  }, [editor])

  return (
    <div
      ref={menuRef}
      className="bubble-menu flex items-center gap-1 bg-gray-900 text-white rounded-lg p-1 shadow-lg border
      dark:bg-white dark:text-black
      "
      style={{ display: "none" }}
    >
      <Button
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        variant={editor.isActive("underline") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        variant={editor.isActive("code") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Code className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 dark:bg-gray-600 mx-1" />
      <Button
        variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="h-8 w-8 p-0 light:text-white hover:bg-gray-700"
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-gray-600 mx-1" />
      <LinkBubbleButton editor={editor} />
    </div>
  )
}
