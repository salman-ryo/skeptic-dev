import { motion } from "framer-motion";

const SlideIn = ({ children }: { children: React.ReactNode }) => {
    return (
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {children}
      </motion.div>
    );
  };
  
  export default SlideIn;
  