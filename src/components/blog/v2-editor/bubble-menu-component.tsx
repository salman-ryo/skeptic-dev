"use client"

import { useEffect, useRef, useCallback, useMemo } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Highlighter, Type } from "lucide-react"
import { LinkBubbleButton } from "./link-bubble-button"

interface BubbleMenuComponentProps {
  editor: Editor
}

export function BubbleMenuComponent({ editor }: BubbleMenuComponentProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const isPositioningRef = useRef(false)

  // Memoized button configurations for better performance
  const formatButtons = useMemo(() => [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
      key: "bold"
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
      key: "italic"
    },
    {
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
      key: "underline",
      disabled: () => !editor.can().toggleUnderline()
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
      key: "strike"
    },
    {
      icon: Highlighter,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
      key: "highlight"
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
      key: "code"
    }
  ], [editor])

  const headingButtons = useMemo(() => [
    {
      icon: Type,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
      key: "paragraph"
    },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      key: "heading1"
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
      key: "heading2"
    }
  ], [editor])

  // Optimized update function with debouncing
  const updateMenu = useCallback(() => {
    if (isPositioningRef.current) return
    
    const { selection } = editor.state
    const { from, to, empty } = selection

    if (empty || from === to) {
      // No selection, hide menu
      if (menuRef.current) {
        menuRef.current.style.display = "none"
      }
      return
    }

    // Show menu and position it
    if (menuRef.current) {
      isPositioningRef.current = true
      
      requestAnimationFrame(() => {
        if (!menuRef.current) {
          isPositioningRef.current = false
          return
        }

        menuRef.current.style.display = "flex"

        // Position the menu
        const { view } = editor
        const start = view.coordsAtPos(from)
        const end = view.coordsAtPos(to)
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

        isPositioningRef.current = false
      })
    }
  }, [editor])

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout
      return () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(updateMenu, 10)
      }
    })(),
    [updateMenu]
  )

  useEffect(() => {
    // Enhanced event handling
    const events = ["selectionUpdate", "transaction", "focus", "blur"] as const
    
    events.forEach(event => {
      editor.on(event, debouncedUpdate)
    })

    // Handle window events
    const handleWindowEvent = () => debouncedUpdate()
    window.addEventListener("resize", handleWindowEvent)
    window.addEventListener("scroll", handleWindowEvent, true)

    return () => {
      events.forEach(event => {
        editor.off(event, debouncedUpdate)
      })
      window.removeEventListener("resize", handleWindowEvent)
      window.removeEventListener("scroll", handleWindowEvent, true)
    }
  }, [editor, debouncedUpdate])

  return (
    <div
      ref={menuRef}
      className="bubble-menu flex items-center gap-1 bg-gray-900 text-white rounded-lg p-1 shadow-lg border
      dark:bg-white dark:text-black
      "
      style={{ display: "none" }}
    >
      {/* Text formatting buttons */}
      {formatButtons.map(({ icon: Icon, action, isActive, key, disabled }) => {
        const active = isActive()
        return (
          <Button
            key={key}
            variant={active ? "secondary" : "ghost"}
            size="sm"
            onClick={action}
            disabled={disabled?.()}
            className={`h-8 w-8 p-0 ${
              active 
                ? "bg-white text-black dark:bg-gray-800 dark:text-white" 
                : "text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300 dark:hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
          </Button>
        )
      })}

      <div className="w-px h-6 bg-gray-600 dark:bg-gray-300 mx-1" />

      {/* Paragraph button */}
      {(() => {
        const active = editor.isActive("paragraph")
        return (
          <Button
            variant={active ? "secondary" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`h-8 w-8 p-0 ${
              active 
                ? "bg-white text-black dark:bg-gray-800 dark:text-white" 
                : "text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300 dark:hover:text-gray-700"
            }`}
          >
            <Type className="w-4 h-4" />
          </Button>
        )
      })()}

      {/* Heading buttons */}
      {(() => {
        const h1Active = editor.isActive("heading", { level: 1 })
        return (
          <Button
            variant={h1Active ? "secondary" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`h-8 w-8 p-0 ${
              h1Active 
                ? "bg-white text-black dark:bg-gray-800 dark:text-white" 
                : "text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300 dark:hover:text-gray-700"
            }`}
          >
            <Heading1 className="w-4 h-4" />
          </Button>
        )
      })()}
      
      {(() => {
        const h2Active = editor.isActive("heading", { level: 2 })
        return (
          <Button
            variant={h2Active ? "secondary" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`h-8 w-8 p-0 ${
              h2Active 
                ? "bg-white text-black dark:bg-gray-800 dark:text-white" 
                : "text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300 dark:hover:text-gray-700"
            }`}
          >
            <Heading2 className="w-4 h-4" />
          </Button>
        )
      })()}

      <div className="w-px h-6 bg-gray-600 dark:bg-gray-300 mx-1" />

      <LinkBubbleButton editor={editor} />
    </div>
  )
}
