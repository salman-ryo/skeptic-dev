"use client"

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnhancedCodeBlockProps {
  node: any
  updateAttributes: (attributes: any) => void
  extension: any
}

export function EnhancedCodeBlock({ node, updateAttributes }: EnhancedCodeBlockProps) {
  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "css",
    "html",
    "json",
    "bash",
    "c",
    "cpp",
    "go",
    "rust",
    "php",
    "ruby",
  ]

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
        <Select
          value={node.attrs.language || "javascript"}
          onValueChange={(language) => updateAttributes({ language })}
        >
          <SelectTrigger className="w-40 h-8 bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-300">Code Block</span>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  )
}
