"use client";

import { Button } from "@/components/ui/button";
import { Save, Eye, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Position = "right" | "top";

interface DraggableActionsMenuProps {
  isPreview: boolean;
  onTogglePreview: (preview: boolean) => void;
  onSave: () => void;
  isSaving: boolean;
  canSave: boolean;
  position: Position;
  onPositionChange: (position: Position) => void;
  otherMenuPosition: Position | "left";
}

export function DraggableActionsMenu({
  isPreview,
  onTogglePreview,
  onSave,
  isSaving,
  canSave,
  position,
}: DraggableActionsMenuProps) {
  const isHorizontal = position === "top";

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={`
          fixed z-50 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-cyan-400 
          rounded-lg shadow-2xl p-2 transition-all duration-200
          ${
            isHorizontal
              ? "top-20 right-4"
              : "top-32 right-4"
          }
        `}
      >
        <div
          className={`flex ${
            isHorizontal ? "flex-row" : "flex-col"
          } items-center gap-2`}
        >
          {/* Toggle Preview/Edit Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onTogglePreview(!isPreview)}
                size="sm"
                variant="ghost"
                className="w-9 h-9 p-0"
              >
                {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isPreview ? "Edit Mode" : "Preview Mode"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Save Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onSave}
                size="sm"
                variant="ghost"
                disabled={isSaving || !canSave}
                className="w-9 h-9 p-0"
              >
                <Save className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isSaving ? "Saving..." : "Save Blog"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
