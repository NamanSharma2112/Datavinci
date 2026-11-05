"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ThinkingOrb } from "thinking-orbs";
import { platformMeta, type Platform } from "@/content/site";
import { NumberAnimation } from "../../ui/number-animation";
import { Segmented } from "../../ui/segmented";
import { Spark } from "../../ui/spark";
import { PlatformIcon } from "../../ui/platform-icon";
import { useTheme } from "../../ui/use-theme";
import { EASE } from "../../ui/reveal";
import { ALERTS, CHANNELS, DATA, PLATFORMS, type Alert, type Period } from "./data";

type Page = "overview" | "channels" | "alerts";

const PAGE_LABEL: Record<Page, string> = { overview: "Overview", channels: "Channels", alerts: "Alerts" };

export function Dashboard() {
  const [page, setPage] = useState<Page>("overview");
  const [period, setPeriod] = useState<Period>("month");
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);

  return (
    <div className="overflow-hidden rounded-[22px] bg-bg-2 p-1.5 shadow-[var(--shadow-float)] ring-1 ring-line sm:rounded-[26px] sm:p-2">
      <div className="flex min-h-[600px] overflow-hidden rounded-[18px] bg-surface ring-1 ring-line sm:rounded-[20px]">
        <Rail page={page} setPage={setPage} alertCount={alerts.length} />

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-4 pb-4 pt-5 sm:px-6">
            <div>
              <div className="mb-3 sm:hidden">
                <Segmented
                  label="Page"
                  size="sm"
                  value={page}
                  onChange={setPage}
                  options={(["overview", "channels", "alerts"] as Page[]).map((p) => ({ id: p, label: PAGE_LABEL[p] }))}
                />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3
                  key={page}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="font-display text-[24px] font-semibold tracking-[-0.03em] text-ink sm:text-[28px]"
                >
                  {PAGE_LABEL[page]}
                </motion.h3>
              </AnimatePresence>
              <p className="mt-0.5 text-[13px] text-muted">
                {page === "overview" ? DATA[period].range : page === "channels" ? "May 1 – May 30 · claimed vs blended" : `${alerts.length} open · watching 5 platforms`}
              </p>
            </div>
            {page === "overview" ? (
              <Segmented
                label="Period"
                value={period}
                onChange={setPeriod}
                options={[
                  { id: "today", label: "Today" },
                  { id: "week", label: "Week" },
                  { id: "month", label: "Month" },
                ]}
              />
            ) : (
              <span className="flex items-center gap-1.5 text-[12.5px] text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-good/60 motion-reduce:animate-none" />
                  <span className="relative size-2 rounded-full bg-good" />
                </span>
                Synced 4 min ago
              </span>
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: EASE }}
              className="p-3 sm:p-5"
            >
              {page === "overview" ? (
                <Overview period={period} />
              ) : page === "channels" ? (
                <Channels />
              ) : (
                <Alerts alerts={alerts} setAlerts={setAlerts} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ rail */

function Rail({ page, setPage, alertCount }: { page: Page; setPage: (p: Page) => void; alertCount: number }) {
  const items: { id: Page | "reports"; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <IconHome /> },
    { id: "channels", label: "Channels", icon: <IconLayers /> },
    { id: "alerts", label: "Alerts", icon: <IconBell /> },
    { id: "reports", label: "Reports", icon: <IconDoc /> },
  ];
  return (
    <nav aria-label="Dashboard pages" className="hidden w-[64px] shrink-0 flex-col items-center gap-1.5 border-r border-line bg-surface-2 py-4 sm:flex">
      <span className="mb-3 grid size-9 place-items-center rounded-[10px] bg-ink">
        <svg viewBox="0 0 28 28" className="size-5" aria-hidden="true">
          <path d="M7 18.5 11.5 14l3.5 3 6-7" fill="none" stroke="var(--bg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="21" cy="10" r="2.4" fill="var(--accent)" />
        </svg>
      </span>
      {items.map((it) => {
        const active = it.id === page;
        const disabled = it.id === "reports";
        return (
          <button
            key={it.id}
            type="button"
            title={it.label}
            aria-label={it.label}
            aria-current={active ? "page" : undefined}
            disabled={disabled}
            onClick={() => !disabled && setPage(it.id as Page)}
            className={`press relative grid size-10 place-items-center rounded-[11px] transition-colors ${
              active ? "text-ink" : disabled ? "cursor-default text-faint/60" : "text-muted hover:bg-ink/[0.05] hover:text-ink"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="rail-active"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                className="absolute inset-0 rounded-[11px] bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-line dark:bg-white/[0.08]"
              />
            ) : null}
            <span className="relative">{it.icon}</span>
            {it.id === "alerts" && alertCount > 0 ? (
              <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[9.5px] font-semibold leading-4 text-white">
                {alertCount}
              </span>
            ) : null}
          </button>
        );
      })}
      <span className="mt-auto grid size-8 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-ink">S</span>
    </nav>
  );
}

/* -------------------------------------------------------------- overview */

function Overview({ period }: { period: Period }) {
  const d = DATA[period];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
        {d.kpis.map((k, i) => (
          <div key={k.id} className="rounded-2xl bg-surface-2 p-3.5 ring-1 ring-line sm:p-4">
            <p className="text-[12px] font-medium text-muted">{k.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <span className="font-display text-[22px] font-semibold tracking-[-0.03em] text-ink sm:text-[27px]">
                <NumberAnimation value={inView ? k.value : k.value.replace(/\d/g, "0")} align="end" stagger={0.05} />
              </span>
              <span
                className={`mb-1 inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                  k.good ? "bg-good-soft text-good" : "bg-bad-soft text-bad"
                }`}
              >
                <NumberAnimation value={k.delta} />
              </span>
            </div>
            <Spark data={k.series} color={k.good ? "var(--good)" : "var(--bad)"} className="mt-3 h-8 w-full" />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <RevenueBars period={period} />
        <Insights />
      </div>
    </div>
  );
}

function RevenueBars({ period }: { period: Period }) {
  const d = DATA[period];
  const [hidden, setHidden] = useState<Set<Platform>>(new Set());
  const [hover, setHover] = useState<number | null>(null);
  const visible = PLATFORMS.filter((p) => !hidden.has(p));
  const totals = d.buckets.map((b) => visible.reduce((s, p) => s + b.values[p], 0));
  const max = Math.max(...totals, 1);
  const showEvery = d.buckets.length > 12 ? 7 : 1;

  const toggle = (p: Platform) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else if (visible.length > 1) next.add(p);
      return next;
    });

  const hv = hover !== null ? d.buckets[hover] : null;

  return (
    <div className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13.5px] font-medium text-ink">Revenue by platform</p>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Toggle platforms">
          {PLATFORMS.map((p) => {
            const on = !hidden.has(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(p)}
                className={`press inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] ring-1 transition-colors ${
                  on ? "bg-surface text-ink ring-line" : "text-faint ring-transparent hover:text-muted"
                }`}
              >
                <span className="size-2 rounded-[3px] transition-opacity" style={{ background: platformMeta[p].color, opacity: on ? 1 : 0.3 }} />
                {platformMeta[p].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-5 h-[210px]" onMouseLeave={() => setHover(null)}>
        {[0.25, 0.5, 0.75].map((g) => (
          <span key={g} className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${g * 100}%` }} />
        ))}
        <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1.5">
          {d.buckets.map((b, i) => (
            <div
              key={`${period}-${i}`}
              className="relative flex h-full flex-1 cursor-default flex-col-reverse"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              tabIndex={0}
              aria-label={`${b.label}: $${Math.round(totals[i]).toLocaleString("en-US")}`}
            >
              <motion.div
                className="flex w-full flex-col-reverse overflow-hidden rounded-[5px]"
                initial={{ height: 0 }}
                animate={{ height: `${(totals[i] / max) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.012 }}
                style={{ opacity: hover === null || hover === i ? 1 : 0.45 }}
              >
                {visible.map((p) => (
                  <motion.span
                    key={p}
                    layout
                    className="block w-full"
                    style={{ background: platformMeta[p].color, height: `${(b.values[p] / (totals[i] || 1)) * 100}%` }}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {hv && hover !== null ? (
          <div
            className="pointer-events-none absolute top-1 z-10 w-[164px] rounded-xl bg-surface p-2.5 text-[11.5px] shadow-[var(--shadow-float)] ring-1 ring-line"
            style={{ left: `clamp(0px, calc(${((hover + 0.5) / d.buckets.length) * 100}% - 82px), calc(100% - 164px))` }}
          >
            <p className="font-medium text-ink">{hv.label}</p>
            {visible.map((p) => (
              <p key={p} className="mt-1 flex justify-between text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: platformMeta[p].color }} />
                  {platformMeta[p].label}
                </span>
                <span className="tnum text-ink">${Math.round(hv.values[p]).toLocaleString("en-US")}</span>
              </p>
            ))}
            <p className="mt-1.5 flex justify-between border-t border-line pt-1.5 font-medium text-ink">
              <span>Total</span>
              <span className="tnum">${Math.round(totals[hover]).toLocaleString("en-US")}</span>
            </p>
          </div>
        ) : null}
      </div>
      <div className="mt-2 flex gap-[3px] sm:gap-1.5">
        {d.buckets.map((b, i) => (
          <span key={i} className="flex-1 overflow-visible whitespace-nowrap text-center text-[10.5px] text-faint">
            {i % showEvery === 0 ? b.label.replace("May ", "") : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

const INSIGHT =
  "TikTok is under-delivering at 2.1× against your 3.5× benchmark. Moving $1,200/week to Google is projected to add +$840 in revenue.";

function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [theme] = useTheme();
  const [phase, setPhase] = useState<"wait" | "think" | "type" | "ready" | "applied">("wait");
  const [n, setN] = useState(0);

  // Runs once when the panel first scrolls into view (deps exclude `phase` so the timer isn't cancelled).
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(INSIGHT.length);
      setPhase("ready");
      return;
    }
    setPhase("think");
    const t = window.setTimeout(() => setPhase("type"), 2200);
    return () => window.clearTimeout(t);
  }, [inView, reduced]);

  useEffect(() => {
    if (phase !== "type") return;
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= INSIGHT.length) {
          window.clearInterval(id);
          setPhase("ready");
          return v;
        }
        return v + 2;
      });
    }, 20);
    return () => window.clearInterval(id);
  }, [phase]);

  const more = useMemo(
    () => [
      { t: "Google is your top driver", s: "42% of revenue, up 7 pts" },
      { t: "On track for May", s: "Projected 104% of target" },
    ],
    [],
  );

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl bg-accent-soft/70 p-4 ring-1 ring-accent/20">
        <div className="flex h-5 items-center gap-2">
          <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">AI INSIGHT</span>
          {phase === "think" ? (
            <span className="flex items-center gap-1.5 text-[11.5px] text-accent-ink">
              <ThinkingOrb state="solving" size={20} theme={theme} aria-hidden="true" /> Analyzing 5 platforms…
            </span>
          ) : null}
        </div>
        <p className="mt-2.5 min-h-[84px] text-[13px] leading-[1.55] text-ink" aria-live="polite">
          {INSIGHT.slice(0, n)}
          {phase === "type" ? <span className="caret ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-accent" /> : null}
        </p>
        <div className="mt-2 h-8">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "ready" ? (
              <motion.div key="act" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhase("applied")}
                  className="press h-8 rounded-full bg-accent px-3.5 text-[12.5px] font-medium text-white hover:bg-accent-2"
                >
                  Apply suggestion
                </button>
                <button type="button" className="press h-8 rounded-full px-3 text-[12.5px] text-muted hover:text-ink">
                  Dismiss
                </button>
              </motion.div>
            ) : phase === "applied" ? (
              <motion.div key="done" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex h-8 items-center justify-between text-[12.5px]">
                <span className="flex items-center gap-1.5 font-medium text-good">
                  <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                    <path d="M3.5 8.4 6.5 11l6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Budget shift scheduled
                </span>
                <button type="button" onClick={() => setPhase("ready")} className="text-muted underline-offset-2 hover:text-ink hover:underline">
                  Undo
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {more.map((m, i) => (
        <motion.div
          key={m.t}
          initial={{ opacity: 0, x: 8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.1 }}
          className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3.5 ring-1 ring-line"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-good-soft text-good">
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M2.5 11 6 7.5l2.5 2.5 5-5M10 5h3.5v3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-ink">{m.t}</span>
            <span className="block truncate text-[12px] text-muted">{m.s}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- channels */

function Channels() {
  const totalRev = CHANNELS.reduce((s, c) => s + c.revenue, 0);
  const totalSpend = CHANNELS.reduce((s, c) => s + c.spend, 0);
  const blended = totalRev / totalSpend;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        <Stat label="Platforms claim (Meta + Google)" value="12.2×" strike />
        <Stat label="Blended ROAS (real)" value={`${blended.toFixed(1)}×`} accent />
        <Stat label="Counted twice" value="7.5×" className="hidden sm:block" />
      </div>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
        <table className="w-full min-w-[540px] text-left text-[13px]">
          <thead className="bg-surface-2 text-[11.5px] text-muted">
            <tr>
              <th className="px-4 py-2.5 font-medium">Channel</th>
              <th className="px-4 py-2.5 text-right font-medium">Spend</th>
              <th className="px-4 py-2.5 text-right font-medium">Revenue</th>
              <th className="px-4 py-2.5 text-right font-medium">Claimed ROAS</th>
              <th className="px-4 py-2.5 font-medium">Share of revenue</th>
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((c, i) => (
              <motion.tr
                key={c.p}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                className="border-t border-line"
              >
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2.5 font-medium text-ink">
                    <span className="grid size-7 place-items-center rounded-lg ring-1 ring-line" style={{ color: platformMeta[c.p].color }}>
                      <PlatformIcon name={platformMeta[c.p].label} className="size-3.5" />
                    </span>
                    {platformMeta[c.p].label}
                  </span>
                </td>
                <td className="tnum px-4 py-3 text-right text-muted">{c.spend ? `$${c.spend.toLocaleString("en-US")}` : "—"}</td>
                <td className="tnum px-4 py-3 text-right font-medium text-ink">${c.revenue.toLocaleString("en-US")}</td>
                <td className="tnum px-4 py-3 text-right text-muted">{c.claimed ? `${c.claimed}×` : "organic"}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-28 overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="block h-full rounded-full"
                        style={{ background: platformMeta[c.p].color, transformOrigin: "left" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: c.revenue / totalRev / 0.46 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                      />
                    </span>
                    <span className="tnum text-[12px] text-muted">{Math.round((c.revenue / totalRev) * 100)}%</span>
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, strike, accent, className = "" }: { label: string; value: string; strike?: boolean; accent?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl bg-surface-2 p-4 ring-1 ring-line ${className}`}>
      <p className="text-[12px] text-muted">{label}</p>
      <p
        className={`font-display mt-1.5 text-[26px] font-semibold tracking-[-0.03em] ${
          accent ? "text-accent" : strike ? "text-faint line-through decoration-bad/60 decoration-2" : "text-ink"
        }`}
      >
        <NumberAnimation value={value} />
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- alerts */

function Alerts({ alerts, setAlerts }: { alerts: Alert[]; setAlerts: (a: Alert[]) => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const resolve = (id: string) => {
    setBusy(id);
    window.setTimeout(() => {
      setAlerts(alerts.filter((a) => a.id !== id));
      setBusy(null);
    }, 650);
  };

  return (
    <div className="min-h-[360px]">
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {alerts.map((a) => (
            <motion.li
              key={a.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
                <span
                  className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-[10px] ${a.level === "attention" ? "bg-bad-soft text-bad" : "bg-warn-soft text-warn"}`}
                >
                  <IconBell />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[14px] font-medium text-ink">
                    {a.title}
                    <span className="text-[12px] font-normal text-faint">{a.when}</span>
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted">{a.body}</p>
                </div>
                <button
                  type="button"
                  onClick={() => resolve(a.id)}
                  disabled={busy === a.id}
                  className="press h-8 shrink-0 rounded-full px-3 text-[12.5px] font-medium text-ink ring-1 ring-line-2 hover:bg-surface disabled:opacity-60"
                >
                  {busy === a.id ? "Resolving…" : "Resolve"}
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        {alerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.2 }}
            className="grid place-items-center py-16 text-center"
          >
            <span className="grid size-11 place-items-center rounded-full bg-good-soft text-good">
              <svg viewBox="0 0 16 16" className="size-5" aria-hidden="true">
                <path d="M3.5 8.4 6.5 11l6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="mt-3 text-[15px] font-medium text-ink">All clear</p>
            <p className="mt-1 text-[13px] text-muted">Grippi keeps watching. You'll hear from it in Slack.</p>
            <button type="button" onClick={() => setAlerts(ALERTS)} className="press mt-4 h-8 rounded-full px-3.5 text-[12.5px] text-ink ring-1 ring-line-2">
              Restore demo alerts
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------------------------------- icons */

const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
function IconHome() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden="true">
      <path d="M3.5 8.5 10 3.5l6.5 5V16a1 1 0 0 1-1 1h-3.5v-4.5h-4V17H4.5a1 1 0 0 1-1-1V8.5Z" {...ic} />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden="true">
      <path d="m10 3 7 3.8-7 3.8-7-3.8L10 3Z M3 10.2l7 3.8 7-3.8 M3 13.6l7 3.8 7-3.8" {...ic} />
    </svg>
  );
}
function IconBell() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden="true">
      <path d="M5 8.5a5 5 0 0 1 10 0c0 4 1.5 5.5 1.5 5.5h-13S5 12.5 5 8.5ZM8.2 16.5a2 2 0 0 0 3.6 0" {...ic} />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden="true">
      <path d="M5.5 2.5h6l3.5 3.5v10.5a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z M11.5 2.5V6H15 M7.5 10.5h5 M7.5 13.5h5" {...ic} />
    </svg>
  );
}
