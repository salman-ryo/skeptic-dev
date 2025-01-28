"use client";
import { motion } from "framer-motion";

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number; // Scale factor on hover
}

const HoverScale = ({ children, scale = 1.1 }: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverScale;
