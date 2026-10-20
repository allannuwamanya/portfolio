"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) return setShown(value);
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {/* The final number is in the markup for screen readers and no-JS. */}
      <span className="sr-only">{value.toLocaleString("en-US")}</span>
      <span aria-hidden>{shown.toLocaleString("en-US")}</span>
    </span>
  );
}
