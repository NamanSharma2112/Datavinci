"use client";

import { MotionConfig } from "motion/react";
import { useSystemThemeSync } from "./use-theme";

export function Providers({ children }: { children: React.ReactNode }) {
  useSystemThemeSync();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
