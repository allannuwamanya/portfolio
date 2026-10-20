"use client";

import { motion } from "motion/react";

/**
 * A template re-mounts on every navigation, so each page fades in without the
 * exit-animation machinery that App Router does not support. Scroll position
 * is reset by Next itself.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
