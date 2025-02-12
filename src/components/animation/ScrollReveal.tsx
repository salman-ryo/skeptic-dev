"use client"
import { useEffect } from "react";
import { motion, useAnimation, AnimationControls, Variants, Transition } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
  children: React.ReactNode;
  triggerOnce?: boolean; // Customizable "trigger once" behavior
  animationVariants?: Variants; // External animation variants
  transitionConfig?: Transition; // External transition configuration
  className?:string;
}

const ScrollReveal = ({
  children,
  triggerOnce = true, // Defaults to trigger once
  animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }, // Default animation
  transitionConfig = { duration: 0.8 }, // Default transition
  className
}: ScrollRevealProps) => {
  const controls: AnimationControls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden"); // Reset when out of view if not triggering once
    }
  }, [controls, inView, triggerOnce]);

  return (
    <motion.div
    className={className}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants} // Use provided or default animation variants
      transition={transitionConfig} // Use provided or default transition
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
