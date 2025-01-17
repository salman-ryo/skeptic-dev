// components/CodeBlock.tsx
"use client";
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

interface CodeBlockProps {
  content: string;
  language?: string;
}

export const CodeBlock = ({ content, language = 'javascript' }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-2 top-2 p-2 rounded-lg",
          "bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity",
          "hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        )}
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre className={cn(
        "p-4 rounded-lg overflow-x-auto",
        "bg-gray-900 text-gray-100",
        "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      )}>
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  );
};