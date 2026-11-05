"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  decimals = 1,
  prefix = "",
  suffix = "",
  duration = 1.2,
  delay = 0,
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const c = animate(0, value, { duration, delay, ease: [0.23, 1, 0.32, 1], onUpdate: setN });
    return () => c.stop();
  }, [inView, reduced, value, duration, delay]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
