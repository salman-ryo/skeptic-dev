"use client1"
import React, { useState } from 'react';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

// Import more languages for better coverage
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php';
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/cjs/languages/prism/rust';
import docker from 'react-syntax-highlighter/dist/cjs/languages/prism/docker';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('docker', docker);

interface CodeBlockProps {
  children: string;
  language: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language, className }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Map common language aliases
  const getLanguage = (lang: string) => {
    const langMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'sh': 'bash',
      'shell': 'bash',
      'yml': 'yaml',
      'md': 'markdown',
      'rs': 'rust',
      'dockerfile': 'docker',
    };
    return langMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  const mappedLanguage = getLanguage(language);
  const isDark = theme === 'dark';

  return (
    <div className="relative group my-6">
      {/* Language label */}
      <div className="absolute left-4 top-2 z-20">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono bg-gray-800 dark:bg-gray-900 px-2 py-1 rounded">
          {language}
        </span>
      </div>
      
      {/* Copy button */}
      <div className="absolute right-2 top-2 z-20">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <SyntaxHighlighter
        language={mappedLanguage}
        style={isDark ? oneDark : oneLight}
        className={`rounded-lg overflow-hidden ${className || ''}`}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '14px',
          lineHeight: '1.5',
          padding: '1rem',
          paddingTop: '3rem', // Make room for language label and copy button
        }}
        showLineNumbers={true}
        wrapLines={true}
        lineNumberStyle={{
          minWidth: '3rem',
          paddingRight: '1rem',
          color: isDark ? '#6b7280' : '#9ca3af',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

interface HTMLRendererProps {
  content: string;
  className?: string;
}

export const HTMLRenderer: React.FC<HTMLRendererProps> = ({ content, className }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'pre') {
        const codeElement = domNode.children.find(
          (child) => child instanceof Element && child.name === 'code'
        ) as Element;

        if (codeElement) {
          // Extract language from class attribute (e.g., "language-javascript")
          const classAttr = codeElement.attribs?.class || '';
          const languageMatch = classAttr.match(/language-([\w-]+)/);
          const language = languageMatch ? languageMatch[1] : 'text';
          
          // Get the code content
          const codeContent = codeElement.children
            .map((child) => {
              if ('data' in child) return child.data;
              return '';
            })
            .join('');

          return (
            <CodeBlock language={language}>
              {codeContent}
            </CodeBlock>
          );
        }
      }

      // Handle inline code
      if (domNode instanceof Element && domNode.name === 'code') {
        // Check if this code element is not inside a pre tag
        const isInline = !domNode.parent || (domNode.parent instanceof Element && domNode.parent.name !== 'pre');
        
        if (isInline) {
          const codeContent = domNode.children
            .map((child) => {
              if ('data' in child) return child.data;
              return '';
            })
            .join('');

          return (
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              {codeContent}
            </code>
          );
        }
      }

      // Handle blockquotes
      if (domNode instanceof Element && domNode.name === 'blockquote') {
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-950 text-gray-700 dark:text-gray-300 italic">
            {domNode.children}
          </blockquote>
        );
      }

      // Handle images with responsive classes
      if (domNode instanceof Element && domNode.name === 'img') {
        const { src, alt, ...otherAttribs } = domNode.attribs;
        return (
          <img
            src={src}
            alt={alt || ''}
            className="max-w-full h-auto rounded-lg my-4 shadow-md"
            {...otherAttribs}
          />
        );
      }

      // Handle links
      if (domNode instanceof Element && domNode.name === 'a') {
        const { href, ...otherAttribs } = domNode.attribs;
        const isExternal = href && (href.startsWith('http') || href.startsWith('https'));
        
        return (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors duration-200"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            {...otherAttribs}
          >
            {domNode.children}
          </a>
        );
      }

      // Handle tables
      if (domNode instanceof Element && domNode.name === 'table') {
        return (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              {domNode.children}
            </table>
          </div>
        );
      }

      // Handle table cells
      if (domNode instanceof Element && (domNode.name === 'td' || domNode.name === 'th')) {
        return (
          <domNode.name className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
            {domNode.children}
          </domNode.name>
        );
      }
    },
  };

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 ${className || ''}`}>
      {parse(content, options)}
    </div>
  );
};

export default HTMLRenderer;
