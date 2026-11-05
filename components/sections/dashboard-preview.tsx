"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ThinkingOrb } from "thinking-orbs";
import { agencies, dashboard, platformMeta, type Platform } from "@/content/site";
import { CountUp } from "../ui/count-up";
import { EASE } from "../ui/reveal";
import { useTheme } from "../ui/use-theme";
import { StatusPill } from "./status-pill";
import { Sparkline } from "./sparkline";

type View = "brand" | "agency";

export function DashboardPreview() {
  const [view, setView] = useState<View>("brand");

  return (
    <div>
      <div className="mb-5 flex justify-center">
        <div role="tablist" aria-label="Dashboard view" className="relative inline-flex rounded-full bg-bg-2 p-1 ring-1 ring-line">
          {(
            [
              ["brand", "For brands"],
              ["agency", "For agencies"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`press relative h-8 rounded-full px-4 text-[13.5px] font-medium ${view === id ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {view === id ? (
                <motion.span
                  layoutId="view-pill"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                  className="absolute inset-0 rounded-full bg-surface shadow-[var(--shadow-card)] ring-1 ring-line"
                />
              ) : null}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] bg-surface shadow-[var(--shadow-float)] ring-1 ring-line sm:rounded-[24px]">
        <AppChrome view={view} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {view === "brand" ? <BrandView /> : <AgencyView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AppChrome({ view }: { view: View }) {
  const tabs = ["Overall", "Shopify", "Amazon", "Meta", "Google", "TikTok"];
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="hidden font-mono text-[11.5px] text-faint sm:inline">app.grippi.io</span>
        <span className="hidden h-4 w-px bg-line-2 sm:block" />
        <span className="truncate text-[13px] font-medium text-ink">{view === "brand" ? "Dashboard" : "Masterview · 24 clients"}</span>
      </div>
      <div className="no-scrollbar -mr-1 flex items-center gap-0.5 overflow-hidden">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`hidden rounded-md px-2.5 py-1 text-[12px] md:inline ${i === 0 ? "bg-bg-2 font-medium text-ink ring-1 ring-line" : "text-muted"}`}
          >
            {t}
          </span>
        ))}
        <span className="ml-2 rounded-md px-2.5 py-1 text-[12px] text-muted ring-1 ring-line">{dashboard.month}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ brand */

function BrandView() {
  return (
    <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
      <div className="flex items-baseline justify-between px-1">
        <p className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">{dashboard.greeting}</p>
        <p className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="size-1.5 rounded-full bg-good" />
          {dashboard.updated}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {dashboard.kpis.map((k, i) => (
          <div key={k.label} className="rounded-2xl bg-surface-2 p-3.5 ring-1 ring-line sm:p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-medium text-muted">{k.label}</p>
              {k.tag ? <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-ink">{k.tag}</span> : null}
            </div>
            <p className="font-display mt-2 text-[24px] font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">
              {k.format === "k" ? (
                <CountUp value={k.value} prefix="$" suffix="K" delay={0.15 + i * 0.06} />
              ) : (
                <CountUp value={k.value} suffix="×" delay={0.15 + i * 0.06} />
              )}
            </p>
            <p className={`mt-1 text-[11.5px] font-medium ${k.up || k.goodWhenDown ? "text-good" : "text-bad"}`}>
              {k.up ? "↑" : "↓"} {k.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <RevenueChart />
        <div className="grid gap-3 sm:gap-4">
          <Contribution />
          <InsightCard />
        </div>
      </div>
    </div>
  );
}

const SERIES: Platform[] = ["shopify", "google", "meta"]; // stacked bottom → top

/** Deterministic, plausible-looking 30-day revenue by platform. */
function useRevenueData() {
  return useMemo(() => {
    const days = 30;
    return Array.from({ length: days }, (_, d) => {
      const t = d / (days - 1);
      const wave = (k: number, ph: number) => Math.sin(d * k + ph);
      return {
        meta: 1500 + t * 520 + wave(0.7, 0.3) * 160 + wave(2.1, 1) * 70,
        google: 640 + t * 240 + wave(0.55, 1.9) * 90 + wave(1.7, 0.4) * 40,
        shopify: 330 + t * 90 + wave(0.9, 2.6) * 45,
      } as Record<Platform, number>;
    });
  }, []);
}

function RevenueChart() {
  const data = useRevenueData();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  const W = 640;
  const H = 220;
  const max = Math.max(...data.map((d) => SERIES.reduce((s, p) => s + d[p], 0))) * 1.08;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;

  const areas = SERIES.map((p, si) => {
    const below = SERIES.slice(0, si);
    const top = data.map((d, i) => [x(i), y(below.reduce((s, q) => s + d[q], 0) + d[p])] as const);
    const bottom = data.map((d, i) => [x(i), y(below.reduce((s, q) => s + d[q], 0))] as const).reverse();
    const path = `M${top.map(([a, b]) => `${a},${b}`).join("L")}L${bottom.map(([a, b]) => `${a},${b}`).join("L")}Z`;
    const line = `M${top.map(([a, b]) => `${a},${b}`).join("L")}`;
    return { p, path, line };
  });

  const hv = hover !== null ? data[hover] : null;
  const total = hv ? SERIES.reduce((s, p) => s + hv[p], 0) : 0;

  return (
    <div ref={ref} className="relative flex flex-col rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">Revenue by platform · last 30 days</p>
        <div className="flex items-center gap-3">
          {[...SERIES].reverse().map((p) => (
            <span key={p} className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span className="size-2 rounded-[3px]" style={{ background: platformMeta[p].color }} />
              {platformMeta[p].label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="h-[170px] w-full sm:h-full sm:min-h-[210px]"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const i = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1));
            setHover(Math.max(0, Math.min(data.length - 1, i)));
          }}
          role="img"
          aria-label="Stacked area chart of daily revenue from Meta, Google and Shopify over the last 30 days, trending up."
        >
          <defs>
            <clipPath id="reveal">
              <motion.rect
                x="0"
                y="0"
                height={H}
                initial={{ width: reduced ? W : 0 }}
                animate={{ width: inView || reduced ? W : 0 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              />
            </clipPath>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--line)" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
          ))}
          <g clipPath="url(#reveal)">
            {areas.map((a) => (
              <g key={a.p}>
                <path d={a.path} fill={platformMeta[a.p].color} fillOpacity={0.16} />
                <path d={a.line} fill="none" stroke={platformMeta[a.p].color} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>
          {hover !== null ? (
            <line x1={x(hover)} x2={x(hover)} y1="0" y2={H} stroke="var(--ink)" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
          ) : null}
        </svg>

        {hv && hover !== null ? (
          <div
            className="pointer-events-none absolute top-2 z-10 w-[148px] rounded-xl bg-surface p-2.5 text-[11.5px] shadow-[var(--shadow-float)] ring-1 ring-line"
            style={{ left: `clamp(0px, calc(${(hover / (data.length - 1)) * 100}% - 74px), calc(100% - 148px))` }}
          >
            <p className="font-medium text-ink">May {hover + 1}</p>
            {[...SERIES].reverse().map((p) => (
              <p key={p} className="mt-1 flex justify-between text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: platformMeta[p].color }} />
                  {platformMeta[p].label}
                </span>
                <span className="tnum text-ink">${(hv[p] / 1000).toFixed(2)}K</span>
              </p>
            ))}
            <p className="mt-1.5 flex justify-between border-t border-line pt-1.5 font-medium text-ink">
              <span>Total</span>
              <span className="tnum">${(total / 1000).toFixed(2)}K</span>
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex justify-between text-[11px] text-faint">
        <span>May 1</span>
        <span>May 15</span>
        <span>May 30</span>
      </div>
    </div>
  );
}

function Contribution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <p className="text-[13px] font-medium text-ink">Platform contribution</p>
      <div className="mt-3 space-y-2.5">
        {dashboard.contribution.map((c, i) => (
          <div key={c.p} className="grid grid-cols-[56px_1fr_34px] items-center gap-2 text-[12px]">
            <span className="text-muted">{platformMeta[c.p].label}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: platformMeta[c.p].color, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? c.pct / 60 : 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.08 }}
              />
            </span>
            <span className="tnum text-right font-medium text-ink">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [theme] = useTheme();
  const [phase, setPhase] = useState<"wait" | "think" | "type" | "done">("wait");
  const [n, setN] = useState(0);
  const text = dashboard.insight;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(text.length);
      setPhase("done");
      return;
    }
    setPhase("think");
    const t1 = window.setTimeout(() => setPhase("type"), 2400);
    return () => window.clearTimeout(t1);
  }, [inView, reduced, text.length]);

  useEffect(() => {
    if (phase !== "type") return;
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          window.clearInterval(id);
          setPhase("done");
          return v;
        }
        return v + 2;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [phase, text.length]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl bg-accent-soft/60 p-4 ring-1 ring-accent/20">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          AI INSIGHT
        </span>
        {phase === "think" ? (
          <span className="flex items-center gap-1.5 text-[11.5px] text-accent-ink">
            <ThinkingOrb state="solving" size={20} theme={theme} aria-hidden="true" />
            Analyzing 5 platforms…
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 min-h-[76px] text-[13px] leading-[1.55] text-ink" aria-live="polite">
        {text.slice(0, n)}
        {phase === "type" ? <span className="caret ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-accent" /> : null}
      </p>
      <motion.div
        initial={false}
        animate={{ opacity: phase === "done" ? 1 : 0, y: phase === "done" ? 0 : 4 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="mt-2 flex items-center justify-between text-[12px]"
      >
        <span className="font-medium text-accent-ink">{dashboard.insightAction} ›</span>
        <span className="text-faint">Dismiss</span>
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------------- agency */

function AgencyView() {
  const rows = agencies.clients.slice(0, 6);
  return (
    <div className="p-3 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">Every client. One table.</p>
        <div className="flex gap-1.5 text-[11.5px]">
          <span className="rounded-full bg-bad-soft px-2 py-0.5 font-medium text-bad">1 attention</span>
          <span className="rounded-full bg-warn-soft px-2 py-0.5 font-medium text-warn">2 review</span>
          <span className="rounded-full bg-good-soft px-2 py-0.5 font-medium text-good">21 healthy</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-line">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-surface-2 text-[11.5px] text-muted">
            <tr>
              <th className="px-4 py-2.5 font-medium">Client</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 text-right font-medium">Blended ROAS</th>
              <th className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">Spend</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">6-week trend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <motion.tr
                key={c.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.04 * i }}
                className="border-t border-line"
              >
                <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-4 py-3">
                  <StatusPill status={c.status} />
                </td>
                <td className="tnum px-4 py-3 text-right font-medium text-ink">{c.roas.toFixed(1)}×</td>
                <td className="tnum hidden px-4 py-3 text-right text-muted sm:table-cell">${(c.spend / 1000).toFixed(1)}K</td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <Sparkline values={c.trend} status={c.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
