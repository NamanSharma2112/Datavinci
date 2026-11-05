"use client";

/**
 * Smoothed sparkline with a soft area fill; redraws when data changes.
 * Adapted from ObsidianUI "Analytics Dashboard" (https://www.obsidianui.dev), MIT License.
 */
import { useId } from "react";
import { motion } from "motion/react";

export function Spark({
  data,
  color = "var(--good)",
  width = 132,
  height = 34,
  className = "",
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * width, height - 3 - ((v - min) / (max - min || 1)) * (height - 8)]);
  let line = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    line += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  line += ` T ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  const key = data.join(",");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true" className={`overflow-visible ${className}`} style={{ color }}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path key={`a${key}`} d={area} fill={`url(#g${id})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
      <motion.path
        key={`l${key}`}
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.circle key={`c${key}`} cx={last[0]} cy={last[1]} r={2.6} fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, duration: 0.25 }} />
    </svg>
  );
}
