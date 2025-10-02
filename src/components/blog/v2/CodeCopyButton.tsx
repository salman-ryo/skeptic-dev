// components/blog/CodeCopyButton.tsx
'use client';

import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeCopyButtonProps {
  code: string;
}

const CodeCopyButton: React.FC<CodeCopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 z-10 p-2 rounded-md bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
      aria-label="Copy code to clipboard"
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <FiCheck className="w-4 h-4 text-green-400" />
      ) : (
        <FiCopy className="w-4 h-4" />
      )}
    </button>
  );
};

export default CodeCopyButton;
