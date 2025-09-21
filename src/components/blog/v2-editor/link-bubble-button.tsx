"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link, Unlink } from "lucide-react"
import { cn } from "@/lib/utils"

interface LinkBubbleButtonProps {
  editor: Editor;
  className?:string;
}

export function LinkBubbleButton({ editor, className }: LinkBubbleButtonProps) {
  const [url, setUrl] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const setLink = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
        .run()
      setUrl("")
      setIsOpen(false)
    }
  }

  const unsetLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run()
    setIsOpen(false)
  }

  const currentUrl = editor.getAttributes("link").href

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="sm"
          className={cn("h-8 w-8 p-0 light:hover:bg-gray-100",className)}
        >
          <Link className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 opacity-90
      light:bg-white bg-slate-900
      ">
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Link</h4>
            <p className="text-sm text-muted-foreground">
              {editor.isActive("link") ? "Edit the link URL" : "Enter a URL to link the selected text"}
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={url || currentUrl || ""}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && setLink()}
              className="flex-1"
            />
            <Button onClick={setLink} size="sm">
              {editor.isActive("link") ? "Update" : "Add"}
            </Button>
          </div>
          {editor.isActive("link") && (
            <Button onClick={unsetLink} variant="outline" size="sm" className="w-full bg-transparent">
              <Unlink className="w-4 h-4 mr-2" />
              Remove Link
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
