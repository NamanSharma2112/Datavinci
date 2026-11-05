"use client";

/**
 * A 3D stack of cards. Press the front card, fling it, or use the arrow keys:
 * it drops to the back and the rest step forward. Auto-advances while visible,
 * pauses on hover/focus and when reduced motion is requested.
 * Interaction inspired by Bencho's "Card swap" block; original implementation.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type PanInfo } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function CardSwap({
  cards,
  interval = 3800,
  label,
  className = "",
}: {
  cards: { key: string; title: string; node: ReactNode }[];
  interval?: number;
  label: string;
  className?: string;
}) {
  const n = cards.length;
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.5 });
  const reduced = useReducedMotion();

  const swap = useCallback(() => {
    if (leaving !== null) return;
    const front = order[0];
    setLeaving(front);
    window.setTimeout(
      () => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setLeaving(null);
      },
      reduced ? 0 : 260,
    );
  }, [leaving, order, reduced]);

  const back = useCallback(() => {
    if (leaving !== null) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, [leaving]);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const t = window.setInterval(swap, interval);
    return () => window.clearInterval(t);
  }, [inView, paused, reduced, swap, interval]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.y) > 60 || Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.y) > 500) swap();
  };

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="card stack"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
          e.preventDefault();
          swap();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          back();
        }
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`relative rounded-2xl outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <p className="sr-only" aria-live="polite">
        {cards[order[0]].title}
      </p>
      <div className="relative h-full w-full [transform-style:preserve-3d]">
        {cards.map((c, i) => {
          const pos = order.indexOf(i);
          const isLeaving = leaving === i;
          const front = pos === 0;
          return (
            <motion.div
              key={c.key}
              aria-hidden={!front}
              drag={front && !reduced ? true : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              onTap={front ? swap : undefined}
              initial={false}
              animate={
                isLeaving
                  ? { x: 0, y: 70, z: 40, rotateX: -8, scale: 1.02, opacity: 1 }
                  : {
                      x: pos * 26,
                      y: pos * -24,
                      z: pos * -70,
                      rotateX: 0,
                      scale: 1,
                      opacity: pos > 3 ? 0 : 1 - pos * 0.08,
                    }
              }
              transition={{ duration: isLeaving ? 0.26 : 0.55, ease: EASE }}
              style={{ zIndex: isLeaving ? n + 1 : n - pos, transformStyle: "preserve-3d" }}
              className={`absolute inset-0 select-none ${front ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
            >
              <div
                className={`h-full w-full overflow-hidden rounded-2xl bg-surface ring-1 ${front ? "ring-line" : "ring-line-2"}`}
                style={{
                  boxShadow: front ? "var(--shadow-float)" : "0 10px 30px -18px rgb(0 0 0 / 0.35)",
                  filter: pos > 0 ? `brightness(${1 - pos * 0.04})` : undefined,
                }}
              >
                {c.node}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
