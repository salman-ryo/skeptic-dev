"use client"
import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationConfig = {
  variant: {
    hidden: any;
    visible: any;
  };
  transition: any;
};

type AnimationWrapperProps = {
  children: ReactNode;
  animationConfig: AnimationConfig;
  className?: string;
};

const AnimationWrapper = ({
  children,
  animationConfig,
  className = "",
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={animationConfig.variant}
      transition={animationConfig.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
