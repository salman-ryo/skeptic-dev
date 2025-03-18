"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { useState, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Quote,
  Code,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import SimpleTooltip from "@/components/common/SimpleTooltip"

interface RichTextEditorProps {
  onChange: (html: string) => void
  initialContent?: string
  placeholder?: string
}

export const RichTextEditor = ({
  onChange,
  initialContent = "",
  placeholder = "Write something amazing...",
}: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState("")
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [_, forceUpdate] = useState({})

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "light:text-gray-800 underline dark:text-blue-400",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert focus:outline-none min-h-[200px] max-w-none p-4",
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      forceUpdate({}) // Force re-render on selection changes
    }

    editor.on('selectionUpdate', handleSelectionUpdate)
    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate)
    }
  }, [editor])

  const setLink = () => {
    if (!linkUrl) return

    if (editor?.state.selection.empty) {
      // Insert link as text if selection is empty
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: linkUrl,
          marks: [{ type: 'link', attrs: { href: linkUrl } }],
        })
        .run()
    } else {
      editor?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run()
    }

    setLinkUrl("")
    setIsLinkDialogOpen(false)
  }

  const handleTopMenuLink = (pressed: boolean) => {
    if (editor?.isActive('link')) {
      editor.chain().focus().unsetLink().run()
    } else {
      setIsLinkDialogOpen(true)
    }
  }

  const handleBubbleMenuLink = () => {
    if (editor?.isActive('link')) {
      editor.chain().focus().unsetLink().run()
    } else {
      setIsLinkDialogOpen(true)
    }
  }

  if (!editor) {
    return null
  }

  const activeButtonClass = (isActive: boolean) => 
    isActive ? "bg-gradient-to-tr from-purple-600 to-blue-600 text-white light:from-black light:to-gray-800" : ""

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        {/* Formatting Buttons */}
        <SimpleTooltip content="Bold">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Toggle bold"
            className={activeButtonClass(editor.isActive("bold"))}
          >
            <Bold className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Italic">
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Toggle italic"
            className={activeButtonClass(editor.isActive("italic"))}
          >
            <Italic className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Underline">
          <Toggle
            size="sm"
            pressed={editor.isActive("underline")}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            aria-label="Toggle underline"
            className={activeButtonClass(editor.isActive("underline"))}
          >
            <UnderlineIcon className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Highlight">
          <Toggle
            size="sm"
            pressed={editor.isActive("highlight")}
            onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
            aria-label="Toggle highlight"
            className={activeButtonClass(editor.isActive("highlight"))}
          >
            <Highlighter className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <SimpleTooltip content="Link">
              <Toggle
                size="sm"
                pressed={editor.isActive("link")}
                onPressedChange={handleTopMenuLink}
                aria-label="Toggle link"
                className={activeButtonClass(editor.isActive("link"))}
              >
                <LinkIcon className="w-4 h-4" />
              </Toggle>
            </SimpleTooltip>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md z-[9999]">
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && setLink()}
              />
              <button
                onClick={setLink}
                className="px-3 py-1.5 text-sm font-medium bg-black text-white rounded-md dark:bg-white dark:text-black"
              >
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <SimpleTooltip content="Heading 1">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            aria-label="Toggle h1"
            className={activeButtonClass(editor.isActive("heading", { level: 1 }))}
          >
            <Heading1 className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Heading 2">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            aria-label="Toggle h2"
            className={activeButtonClass(editor.isActive("heading", { level: 2 }))}
          >
            <Heading2 className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Heading 3">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            aria-label="Toggle h3"
            className={activeButtonClass(editor.isActive("heading", { level: 3 }))}
          >
            <Heading3 className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <SimpleTooltip content="Bullet List">
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Toggle bullet list"
            className={activeButtonClass(editor.isActive("bulletList"))}
          >
            <List className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Ordered List">
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Toggle ordered list"
            className={activeButtonClass(editor.isActive("orderedList"))}
          >
            <ListOrdered className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Blockquote">
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Toggle blockquote"
            className={activeButtonClass(editor.isActive("blockquote"))}
          >
            <Quote className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Code Block">
          <Toggle
            size="sm"
            pressed={editor.isActive("codeBlock")}
            onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Toggle code block"
            className={activeButtonClass(editor.isActive("codeBlock"))}
          >
            <Code className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <SimpleTooltip content="Align Left">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "left" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
            aria-label="Align left"
            className={activeButtonClass(editor.isActive({ textAlign: "left" }))}
          >
            <AlignLeft className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Align Center">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "center" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
            aria-label="Align center"
            className={activeButtonClass(editor.isActive({ textAlign: "center" }))}
          >
            <AlignCenter className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>

        <SimpleTooltip content="Align Right">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "right" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
            aria-label="Align right"
            className={activeButtonClass(editor.isActive({ textAlign: "right" }))}
          >
            <AlignRight className="w-4 h-4" />
          </Toggle>
        </SimpleTooltip>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-white dark:bg-black opacity-85">
          <div className="flex items-center gap-1 p-1 rounded-md shadow-md bg-background border">
            <SimpleTooltip content="Bold">
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Toggle bold"
                className={activeButtonClass(editor.isActive("bold"))}
              >
                <Bold className="w-3 h-3" />
              </Toggle>
            </SimpleTooltip>

            <SimpleTooltip content="Italic">
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Toggle italic"
                className={activeButtonClass(editor.isActive("italic"))}
              >
                <Italic className="w-3 h-3" />
              </Toggle>
            </SimpleTooltip>

            <SimpleTooltip content="Underline">
              <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Toggle underline"
                className={activeButtonClass(editor.isActive("underline"))}
              >
                <UnderlineIcon className="w-3 h-3" />
              </Toggle>
            </SimpleTooltip>

            <SimpleTooltip content="Link">
              <Toggle
                size="sm"
                pressed={editor.isActive("link")}
                onPressedChange={handleBubbleMenuLink}
                aria-label="Toggle link"
                className={activeButtonClass(editor.isActive("link"))}
              >
                <LinkIcon className="w-3 h-3" />
              </Toggle>
            </SimpleTooltip>

            <SimpleTooltip content="Highlight">
              <Toggle
                size="sm"
                pressed={editor.isActive("highlight")}
                onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                aria-label="Toggle highlight"
                className={activeButtonClass(editor.isActive("highlight"))}
              >
                <Highlighter className="w-3 h-3" />
              </Toggle>
            </SimpleTooltip>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}