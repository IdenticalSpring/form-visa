"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 200, transition: { duration: 0.5 } },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-transition"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        style={{ position: 'relative', width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
