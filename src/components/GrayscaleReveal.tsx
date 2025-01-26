"use client";
import { useEffect, useState } from "react";
import "./style.css"; // Import the custom CSS file
import Link from "next/link";
import { throttle } from "@/utils/performance";

const GrayscaleReveal: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Throttle the mousemove event handler
    const handleMouseMove = throttle((e: MouseEvent) => {
      console.log("Moving...");
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 100); // Adjust the throttle limit as needed (e.g., 100ms)

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="overlay border-4 border-black rounded-full"
      style={{
        clipPath: `circle(150px at ${cursorPosition.x}px ${cursorPosition.y}px)`,
      }}
    ></div>
  );
};

export default GrayscaleReveal;
