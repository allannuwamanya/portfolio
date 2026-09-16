import type { Variants } from "motion/react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_ELASTIC = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH, delay: i * 0.06 },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_SMOOTH, delay: i * 0.05 },
  }),
};

/** Stagger children with a slight upward reveal */
export const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

/** Used for letter-by-letter heading reveals */
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: EASE_ELASTIC, delay: i * 0.035 },
  }),
};

/** Slide in from the right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH, delay: i * 0.1 },
  }),
};

/** Pop up with spring for skill badges */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: i * 0.04 },
  }),
};

