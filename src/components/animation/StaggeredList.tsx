"use client";
import { motion } from "framer-motion";

interface StaggeredListProps {
  items: React.ReactNode[];
}

const StaggeredList = ({ items }: StaggeredListProps) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.ul initial="hidden" animate="visible" variants={listVariants}>
      {items.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default StaggeredList;
