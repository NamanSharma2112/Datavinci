"use client";

/**
 * Dotted world map with animated arcs.
 * Adapted from Aceternity UI "world-map" (ui.aceternity.com/registry/world-map.json).
 * Changes: the dot grid is built on the server and passed in as one SVG path
 * (no 340 KB geodata or data-URI image in the browser, no next-themes), arcs are
 * projected with dotted-map's own projection so they land on the right cities,
 * animation starts in view, data "packets" travel each arc toward the origin,
 * labels are HTML overlays, and prefers-reduced-motion is respected.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Pt = { x: number; y: number };

export type MapMarker = Pt & { id: string; label: string; detail?: string; color?: string; side?: "left" | "right" };

const EASE = [0.23, 1, 0.32, 1] as const;

function arc(from: Pt, to: Pt) {
  const midX = (from.x + to.x) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const midY = Math.min(from.y, to.y) - Math.min(28, dist * 0.32);
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

export function WorldMap({
  path,
  width,
  height,
  origin,
  markers,
  lineColor = "var(--accent)",
}: {
  path: string;
  width: number;
  height: number;
  origin: MapMarker;
  markers: MapMarker[];
  lineColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const pct = (p: Pt) => ({ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` });
  const drawDelay = (i: number) => 0.2 + i * 0.22;

  return (
    <div
      ref={ref}
      className="relative w-full select-none [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_80%,transparent)]"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">

        {/* The dot grid: one path, zero-length segments with round caps. */}
        <path d={path} stroke="currentColor" strokeWidth={0.44} strokeLinecap="round" className="text-ink/[0.16] dark:text-white/[0.16]" />

        {markers.map((m, i) => {
          const d = arc(m, origin);
          return (
            <g key={m.id}>
              {/* Stroke width is in map units (no non-scaling-stroke: it breaks pathLength dashes). */}
              <motion.path
                d={d}
                fill="none"
                stroke={lineColor}
                strokeOpacity={0.7}
                strokeWidth={0.28}
                strokeLinecap="round"
                initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: drawDelay(i) }}
              />
              {/* Data travelling from each store to your dashboard. */}
              {!reduced && inView ? (
                <circle r={0.75} fill={lineColor}>
                  <animateMotion dur="3.2s" begin={`${drawDelay(i) + 1.1}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" begin={`${drawDelay(i) + 1.1}s`} repeatCount="indefinite" />
                </circle>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Markers and labels as HTML so text stays crisp at any size. */}
      {[...markers, origin].map((m, i) => {
        const isOrigin = m.id === origin.id;
        const delay = isOrigin ? 0.1 : drawDelay(i) + 0.9;
        return (
          <div key={m.id} className="absolute" style={pct(m)}>
            <span className="absolute -left-[5px] -top-[5px] grid size-2.5 place-items-center">
              {!reduced ? (
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-60"
                  style={{ background: m.color ?? lineColor, animationDuration: "2.2s" }}
                />
              ) : null}
              <span
                className={`relative rounded-full ring-2 ring-bg ${isOrigin ? "size-3" : "size-2"}`}
                style={{ background: m.color ?? lineColor }}
              />
            </span>
            <motion.span
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay }}
              className={`absolute top-0 hidden -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] shadow-[var(--shadow-card)] ring-1 md:inline-flex ${
                m.side === "left" ? "right-3" : "left-3"
              } ${isOrigin ? "bg-ink font-medium text-bg ring-ink" : "bg-surface text-ink ring-line"}`}
            >
              {m.label}
              {m.detail ? <span className="tnum font-medium" style={{ color: m.color }}>{m.detail}</span> : null}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
