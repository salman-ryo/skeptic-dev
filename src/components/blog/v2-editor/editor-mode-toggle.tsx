"use client";

import { Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorModeToggleProps {
  isPreview: boolean;
  onToggle: (isPreview: boolean) => void;
}

export function EditorModeToggle({ isPreview, onToggle }: EditorModeToggleProps) {
  return (
    <div className="relative inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
      {/* Background slider */}
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)]  dark:text-black rounded-md shadow-sm transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-600",
          isPreview ? "translate-x-[calc(95%)] " : "translate-x-0 bg-cyan-500 text-black"
        )}
      />
      
      {/* Edit Button */}
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "relative z-10 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 min-w-[80px] justify-center",
          !isPreview
            ? "dark:text-gray-900 text-gray-100"
            : "dark:text-gray-500 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <Edit3 className="w-4 h-4 mr-2" />
        Edit
      </button>
      
      {/* Preview Button */}
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "relative z-10 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 min-w-[80px] justify-center",
          isPreview
            ? "text-gray-900 bg-cyan-400 dark:text-gray-100"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </button>
    </div>
  );
}
