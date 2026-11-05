import type { Platform } from "@/content/site";

/**
 * Illustrative demo data for the hero dashboard. The "month" figures match
 * the ones on grippi.io (4.7× blended ROAS, $84.2K revenue, $17.9K spend);
 * "today" and "week" are scaled consistently from them.
 */

export type Period = "today" | "week" | "month";

export const PLATFORMS: Platform[] = ["meta", "google", "shopify", "amazon", "tiktok"];

const SHARE: Record<Platform, number> = { meta: 0.46, google: 0.26, shopify: 0.14, amazon: 0.09, tiktok: 0.05 };

type Kpi = { id: string; label: string; value: string; delta: string; good: boolean; series: number[] };

export type PeriodData = {
  range: string;
  buckets: { label: string; values: Record<Platform, number> }[];
  kpis: Kpi[];
};

/** Deterministic pseudo-random so server and client render the same numbers. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buckets(labels: string[], total: number, seed: number, trend = 0.35) {
  const r = rng(seed);
  const raw = labels.map((_, i) => (1 + trend * (i / Math.max(1, labels.length - 1))) * (0.78 + r() * 0.44));
  const sum = raw.reduce((a, b) => a + b, 0);
  return labels.map((label, i) => {
    const day = (raw[i] / sum) * total;
    const values = {} as Record<Platform, number>;
    for (const p of PLATFORMS) values[p] = day * SHARE[p] * (0.85 + r() * 0.3);
    return { label, values };
  });
}

const series = (n: number, seed: number, up = true) => {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => (up ? i : n - i) * 0.6 + r() * 3 + 10);
};

const hours = ["12a", "2a", "4a", "6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"];
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const month = Array.from({ length: 30 }, (_, i) => `May ${i + 1}`);

export const DATA: Record<Period, PeriodData> = {
  today: {
    range: "Today, May 30",
    buckets: buckets(hours, 2940, 7, 0.1),
    kpis: [
      { id: "roas", label: "Blended ROAS", value: "4.5×", delta: "+0.2", good: true, series: series(12, 3) },
      { id: "rev", label: "Revenue", value: "$2,940", delta: "+6%", good: true, series: series(12, 5) },
      { id: "spend", label: "Ad spend", value: "$653", delta: "−3%", good: true, series: series(12, 9, false) },
      { id: "orders", label: "Orders", value: "24", delta: "+4", good: true, series: series(12, 11) },
    ],
  },
  week: {
    range: "May 24 – May 30",
    buckets: buckets(week, 20800, 13),
    kpis: [
      { id: "roas", label: "Blended ROAS", value: "4.8×", delta: "+0.3", good: true, series: series(14, 17) },
      { id: "rev", label: "Revenue", value: "$20,800", delta: "+9%", good: true, series: series(14, 19) },
      { id: "spend", label: "Ad spend", value: "$4,330", delta: "+2%", good: false, series: series(14, 23) },
      { id: "orders", label: "Orders", value: "168", delta: "+11", good: true, series: series(14, 29) },
    ],
  },
  month: {
    range: "May 1 – May 30",
    buckets: buckets(month, 84200, 31),
    kpis: [
      { id: "roas", label: "Blended ROAS", value: "4.7×", delta: "+0.4", good: true, series: series(20, 37) },
      { id: "rev", label: "Revenue", value: "$84,200", delta: "+12%", good: true, series: series(20, 41) },
      { id: "spend", label: "Ad spend", value: "$17,900", delta: "−2%", good: true, series: series(20, 43, false) },
      { id: "orders", label: "Orders", value: "679", delta: "+48", good: true, series: series(20, 47) },
    ],
  },
};

/** Per-channel view (month). Claimed ROAS is what each ad platform reports about itself. */
export const CHANNELS: { p: Platform; spend: number; revenue: number; claimed: number | null }[] = [
  { p: "meta", spend: 8900, revenue: 38700, claimed: 6.8 },
  { p: "google", spend: 3600, revenue: 21900, claimed: 5.4 },
  { p: "shopify", spend: 0, revenue: 11800, claimed: null },
  { p: "amazon", spend: 2300, revenue: 7600, claimed: 4.4 },
  { p: "tiktok", spend: 3100, revenue: 4200, claimed: 2.8 },
];

export type Alert = { id: string; level: "attention" | "review"; title: string; body: string; when: string };

export const ALERTS: Alert[] = [
  { id: "a1", level: "attention", title: "TikTok ROAS below benchmark", body: "2.1× vs your 3.5× target. $1,200 of weekly spend at risk.", when: "8 min ago" },
  { id: "a2", level: "review", title: "Meta CPC up 18% this week", body: "iOS seasonality. Conversions are holding, so no action yet.", when: "2 h ago" },
  { id: "a3", level: "review", title: "Amazon spend efficiency −18%", body: "ACoS rose to 23%. Worth a look at campaign bids today.", when: "6 h ago" },
];
