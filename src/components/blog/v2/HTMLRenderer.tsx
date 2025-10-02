// components/blog/HTMLRenderer.tsx
"use client";

import React from "react";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
  DOMNode,
} from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import CodeCopyButton from "./CodeCopyButton";

interface HTMLRendererProps {
  content: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ content }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeElement = domNode.children.find(
          (child) => child instanceof Element && child.name === "code"
        ) as Element | undefined;

        if (codeElement) {
          // Extract language from class name (e.g., "language-javascript")
          const className = codeElement.attribs?.class || "";
          const languageMatch = className.match(/language-(\w+)/);
          const language = languageMatch ? languageMatch[1] : "text";

          // Get the code content
          const codeContent = getTextContent(codeElement);

          // code block style
          const themeBasedStyle =
            mounted && theme === "dark"
              ? {
                  backgroundColor: "#020617",
                  border: "2px solid #1e1e1e",
                }
              : { backgroundColor: "#1e1e1e", border: "2px solid gray" };

          return (
            <div className="code-block-wrapper relative my-6 rounded-lg overflow-hidden">
              <CodeCopyButton code={codeContent} />
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus} // Use vscDarkPlus for both themes
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  ...themeBasedStyle,
                }}
                codeTagProps={{
                  style: {
                    fontSize: "1rem",
                    lineHeight: "2rem",
                    fontFamily:
                      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
                  },
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {codeContent}
              </SyntaxHighlighter>
            </div>
          );
        }
      }

      // Handle inline code
      if (
        domNode instanceof Element &&
        domNode.name === "code" &&
        !isChildOfPre(domNode)
      ) {
        const content = getTextContent(domNode);
        return (
          <code className="inline-code px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-pink-600 dark:text-pink-400">
            {content}
          </code>
        );
      }
    },
  };

  return (
    <div
  className="prose prose-lg dark:prose-invert max-w-none 
  prose-headings:font-bold 
  prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
  prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
  prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
  prose-p:text-[1.125rem] prose-p:leading-7 prose-p:mb-4
  prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
  prose-strong:text-cyan-400 prose-strong:font-bold
  [&_blockquote_strong]:text-gray-700 dark:[&_blockquote_strong]:text-gray-300
  [&_h2_strong]:text-gray-900 dark:[&_h2_strong]:text-white
  [&_h1_strong]:text-gray-900 dark:[&_h1_strong]:text-white
  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
  prose-li:my-1
  prose-blockquote:border-l-4 prose-blockquote:border-gray-600 dark:prose-blockquote:border-purple-400 
  prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
  prose-img:rounded-lg prose-img:shadow-lg
  prose-hr:my-8 prose-hr:border-gray-300 dark:prose-hr:border-gray-700
  prose-table:w-full prose-table:border-collapse
  prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2 prose-th:bg-gray-100 dark:prose-th:bg-gray-800
  prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2
"
>
  {parse(content, options)}
</div>

  );
};

// Helper function to get text content from a node
function getTextContent(node: Element): string {
  if (node.children && node.children.length > 0) {
    return node.children
      .map((child) => {
        if ("data" in child) {
          return child.data;
        }
        if (child instanceof Element) {
          return getTextContent(child);
        }
        return "";
      })
      .join("");
  }
  return "";
}

// Helper to check if code element is child of pre
function isChildOfPre(node: DOMNode): boolean {
  let parent = node.parent;
  while (parent) {
    if (parent instanceof Element && parent.name === "pre") {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

export default HTMLRenderer;
