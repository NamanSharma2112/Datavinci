import type { Status } from "@/content/site";

const color: Record<Status, string> = { Attention: "var(--bad)", Review: "var(--warn)", Healthy: "var(--good)" };

export function Sparkline({ values, status, width = 96, height = 24 }: { values: number[]; status: Status; width?: number; height?: number }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * width, height - 2 - ((v - min) / (max - min || 1)) * (height - 4)]);
  const d = `M${pts.map((p) => p.join(",")).join("L")}`;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="overflow-visible">
      <path d={d} fill="none" stroke={color[status]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.2" fill={color[status]} />
    </svg>
  );
}
