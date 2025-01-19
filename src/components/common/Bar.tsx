import { cn } from "@/lib/utils";
import React from "react";

interface BarProps {
  className?: string; // For external styles
}

export const Bar: React.FC<BarProps> = ({ className }) => {
  return <div className={cn("w-[1px] bg-cGray-light h-[1.25rem]", className)} />;
};
