"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}
export default function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
      <motion.div
        id="scroll-indicator"
        className={cn("bg-cPeach dark:bg-orange-600 h-1 z-[999] rounded-full",className)}
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          originX: 0,
        }}
      />
  );
}

