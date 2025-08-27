import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;