"use client";
import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollButtons = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const scroll = (direction: "left" | "right") => {
    if (ref && "current" in ref && ref.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        ref.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      ref.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex gap-x-2 justify-end items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className="rounded-full size-8 shadow-md shadow-gray-400 hover:shadow-gray-600 transition-shadow duration-300
        dark:bg-black dark:shadow-blue-400 border-2 dark:border-blue-600
        "
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className="rounded-full size-8 shadow-md shadow-gray-400 hover:shadow-gray-600 transition-shadow duration-300
        dark:bg-black dark:shadow-blue-400 border-2 dark:border-blue-600
        "
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
});

ScrollButtons.displayName = "ScrollButtons"; // For better debugging

export default ScrollButtons;
