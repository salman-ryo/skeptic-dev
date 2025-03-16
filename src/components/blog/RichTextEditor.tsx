"use client"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { useState } from "react"
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

  const setLink = () => {
    if (!linkUrl) return
    if (editor?.state.selection.empty) return

    editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    setLinkUrl("")
    setIsLinkDialogOpen(false)
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("highlight")}
          onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
          aria-label="Toggle highlight"
        >
          <Highlighter className="w-4 h-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Toggle h1"
        >
          <Heading1 className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Toggle h2"
        >
          <Heading2 className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Toggle h3"
        >
          <Heading3 className="w-4 h-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Toggle bullet list"
        >
          <List className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Toggle blockquote"
        >
          <Quote className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("codeBlock")}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Toggle code block"
        >
          <Code className="w-4 h-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <Toggle size="sm" pressed={editor.isActive("link")} aria-label="Add link">
              <LinkIcon className="w-4 h-4" />
            </Toggle>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
              />
              <button onClick={setLink} className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Align left"
        >
          <AlignLeft className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Align center"
        >
          <AlignCenter className="w-4 h-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Align right"
        >
          <AlignRight className="w-4 h-4" />
        </Toggle>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 p-1 rounded-md shadow-md bg-background border">
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              aria-label="Toggle bold"
            >
              <Bold className="w-3 h-3" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
            >
              <Italic className="w-3 h-3" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("highlight")}
              onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
              aria-label="Toggle highlight"
            >
              <Highlighter className="w-3 h-3" />
            </Toggle>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}