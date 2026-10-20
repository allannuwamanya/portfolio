"use client";

import { MotionConfig } from "motion/react";

/** Makes every motion component honour the visitor's "reduce motion" setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
