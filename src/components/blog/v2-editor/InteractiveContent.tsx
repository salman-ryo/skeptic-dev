// src/components/InteractiveContent.tsx

"use client";

import { useEffect, useRef } from "react";

interface InteractiveContentProps {
  content: string;
}

export function InteractiveContent({ content }: InteractiveContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // The logic is mostly the same, but scoped to our ref for better performance and safety.
    const addCopyButtons = () => {
      const codeBlocks = contentRef.current!.querySelectorAll("pre code");

      codeBlocks.forEach((codeElement) => {
        const pre = codeElement.parentElement as HTMLPreElement;
        // Check if the button has already been added
        if (pre.parentElement?.classList.contains("code-block-wrapper")) {
            return;
        }

        // 1. Create wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // 2. Create header
        const header = document.createElement("div");
        header.className = "code-block-header";

        // 3. Get language
        const language =
          Array.from(codeElement.classList)
            .find((cls) => cls.startsWith("language-"))
            ?.replace("language-", "") || "text";
        const langSpan = document.createElement("span");
        langSpan.textContent = language.charAt(0).toUpperCase() + language.slice(1);
        langSpan.className = "code-block-language";

        // 4. Create copy button
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-button";
        const initialIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>`;
        copyBtn.innerHTML = initialIcon;

        copyBtn.onclick = async () => {
          if (!codeElement.textContent) return;
          try {
            await navigator.clipboard.writeText(codeElement.textContent);
            copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg><span>Copied!</span>`;
            setTimeout(() => {
              copyBtn.innerHTML = initialIcon;
            }, 2000);
          } catch (err) {
            console.error("Failed to copy:", err);
            copyBtn.textContent = "Error";
            setTimeout(() => {
                 copyBtn.innerHTML = initialIcon;
            }, 2000);
          }
        };

        // 5. Assemble the header and add it
        header.appendChild(langSpan);
        header.appendChild(copyBtn);
        wrapper.insertBefore(header, pre);
      });
    };

    // Run the function to add buttons.
    // A small timeout can help ensure the DOM from dangerouslySetInnerHTML is ready.
    const timer = setTimeout(addCopyButtons, 50);

    return () => clearTimeout(timer);
  }, [content]); // Re-run when content changes

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none dark:prose-invert prose-pre:bg-[#111827]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
