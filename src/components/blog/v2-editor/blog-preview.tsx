"use client"

import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

interface BlogPreviewProps {
  title: string
  description: string
  tags: string[]
  content: string
}

export function BlogPreview({ title, description, tags, content }: BlogPreviewProps) {
  useEffect(() => {
    // Add copy functionality to code blocks after component mounts
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll(".blog-preview pre code")

      codeBlocks.forEach((codeElement) => {
        const pre = codeElement.parentElement
        if (pre && !pre.querySelector(".copy-button")) {
          // Create wrapper if it doesn't exist
          let wrapper = pre.parentElement
          if (!wrapper?.classList.contains("code-block-preview-wrapper")) {
            wrapper = document.createElement("div")
            wrapper.className = "code-block-preview-wrapper"
            pre.parentNode?.insertBefore(wrapper, pre)
            wrapper.appendChild(pre)
          }

          // Create header
          const header = document.createElement("div")
          header.className = "code-block-header"

          // Get language from class
          const language =
            Array.from(codeElement.classList)
              .find((cls) => cls.startsWith("language-"))
              ?.replace("language-", "") || "text"

          const langSpan = document.createElement("span")
          langSpan.textContent = language.charAt(0).toUpperCase() + language.slice(1)
          langSpan.className = "code-block-language"

          // Create copy button
          const copyBtn = document.createElement("button")
          copyBtn.className = "copy-button"
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `

          copyBtn.onclick = async () => {
            try {
              await navigator.clipboard.writeText(codeElement.textContent || "")
              copyBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Copied!</span>
              `
              setTimeout(() => {
                copyBtn.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy</span>
                `
              }, 2000)
            } catch (err) {
              console.error("Failed to copy:", err)
            }
          }

          header.appendChild(langSpan)
          header.appendChild(copyBtn)
          wrapper.insertBefore(header, pre)
        }
      })
    }

    // Add copy buttons after a short delay to ensure DOM is ready
    const timer = setTimeout(addCopyButtons, 100)
    return () => clearTimeout(timer)
  }, [content])

  return (
    <div className="blog-preview">
      <article className="max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title || "Untitled"}</h1>
          {description && <p className="text-xl text-gray-600 mb-4">{description}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content || "<p>Start writing to see the preview...</p>" }}
        />
      </article>

      <style jsx>{`
        .code-block-preview-wrapper {
          margin: 1rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid #374151;
        }
        
        .code-block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #1f2937;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        
        .copy-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #374151;
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.75rem;
          transition: background-color 0.2s;
        }
        
        .copy-button:hover {
          background: #4b5563;
        }
        
        .code-block-preview-wrapper pre {
          margin: 0 !important;
          background: #111827 !important;
          color: #f3f4f6 !important;
          padding: 1rem !important;
          border-radius: 0 !important;
        }

        .code-block-preview-wrapper code {
          background: none !important;
          color: inherit !important;
          padding: 0 !important;
          border-radius: 0 !important;
          font-family: 'JetBrains Mono', 'Courier New', Courier, monospace !important;
        }
      `}</style>
    </div>
  )
}
