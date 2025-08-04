// src/components/ContentRenderer.tsx

"use client";

import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import { CodeBlock } from "./code-block";

interface ContentRendererProps {
  htmlContent: string;
}

export function ContentRenderer({ htmlContent }: ContentRendererProps) {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeNode = domNode.children[0];

        // Ensure the structure is <pre><code>...</code></pre>
        if (codeNode && codeNode.type === "tag" && codeNode.name === "code") {
          const langClass = codeNode.attribs.class || ""; // e.g., "language-javascript"
          const language = langClass.replace("language-", "");

          const codeContent = (codeNode.children[0]?.data || "").trim();

          // Replace the <pre> tag with our interactive React component
          return <CodeBlock code={codeContent} language={language} />;
        }
      }
      // Return null to render the node as is, if it's not a code block we want to replace
      return null;
    },
  };

  return <>{parse(htmlContent, options)}</>;
}
