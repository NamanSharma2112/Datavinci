"use client";

import { BorderBeam } from "border-beam";
import { useReducedMotion } from "motion/react";
import { Arrow } from "./button";
import { useTheme } from "./use-theme";

/** The page's one "buy" button: a soft pulse breathes inside it (border-beam, pulse-inner). */
export function BeamCta({ href, children }: { href: string; children: React.ReactNode }) {
  const [theme] = useTheme();
  const reduced = useReducedMotion();
  return (
    <BorderBeam
      size="pulse-inner"
      colorVariant="ocean"
      theme={theme}
      strength={0.75}
      active={!reduced}
      style={{ display: "block", borderRadius: 999 }}
    >
      <a
        href={href}
        className="press group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-white hover:bg-accent-2"
      >
        {children} <Arrow />
      </a>
    </BorderBeam>
  );
}
