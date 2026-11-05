"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { features as f } from "@/content/site";
import { EASE, Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { PlatformIcon } from "../ui/platform-icon";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} />
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-7" title={f.forecast.title} body={f.forecast.body}>
            <ForecastVisual />
          </Card>
          <Card className="lg:col-span-5" title={f.messenger.title} body={f.messenger.body} delay={0.06}>
            <MessengerVisual />
          </Card>
          <Card className="lg:col-span-5" title={f.alerts.title} body={f.alerts.body}>
            <AlertVisual />
          </Card>
          <Card className="lg:col-span-7" title={f.slides.title} body={f.slides.body} delay={0.06}>
            <SlidesVisual />
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  body,
  children,
  className = "",
  delay = 0,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={`flex flex-col overflow-hidden rounded-[24px] bg-surface ring-1 ring-line ${className}`}>
      <div className="p-6 pb-0 sm:p-8 sm:pb-0">
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">{title}</h3>
        <p className="mt-2 max-w-md text-pretty text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
      <div className="mt-8 flex flex-1 items-end px-6 pb-6 sm:px-8 sm:pb-8">{children}</div>
    </Reveal>
  );
}

/* -------------------------------------------------------------- forecast */

function ForecastVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const W = 560;
  const H = 180;
  const maxV = 92;
  const x = (day: number) => ((day - 1) / 30) * W;
  const y = (k: number) => H - (k / maxV) * H;

  // Cumulative revenue ($K): actual to day 15, projection to day 31.
  const actual = Array.from({ length: 15 }, (_, i) => {
    const d = i + 1;
    return [x(d), y((41.1 * d) / 15 + Math.sin(d * 1.3) * 0.8)] as const;
  });
  const actualD = `M${actual.map((p) => p.join(",")).join("L")}`;
  const projD = `M${x(15)},${y(41.1)} L${x(31)},${y(86)}`;
  const bandD = `M${x(15)},${y(41.1)} L${x(31)},${y(91)} L${x(31)},${y(81)} Z`;

  return (
    <div ref={ref} className="w-full rounded-2xl bg-surface-2 p-4 ring-1 ring-line sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">May revenue pacing · day 15 of 31</p>
        <span className="rounded-full bg-good-soft px-2 py-0.5 text-[11.5px] font-medium text-good">On track</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 8}`} className="mt-4 h-auto w-full overflow-visible" role="img" aria-label="Cumulative revenue chart: $41.1K by day 15, projected $86K by month end against an $80K target.">
        <line x1="0" x2={W} y1={y(80)} y2={y(80)} stroke="var(--muted)" strokeDasharray="4 4" strokeOpacity="0.6" />
        <text x="0" y={y(80) - 6} fontSize="11" fill="var(--muted)">Target {f.forecast.target}</text>
        <motion.path d={bandD} fill="var(--accent)" fillOpacity="0.08" initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1.2, duration: 0.6 }} />
        <motion.path
          d={actualD}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        />
        <motion.path
          d={projD}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.25"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        />
        <line x1={x(15)} x2={x(15)} y1="0" y2={H} stroke="var(--line-2)" />
        <circle cx={x(15)} cy={y(41.1)} r="4.5" fill="var(--ink)" stroke="var(--surface-2)" strokeWidth="2" />
        <motion.circle cx={x(31)} cy={y(86)} r="4.5" fill="var(--accent)" stroke="var(--surface-2)" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: inView ? 1 : 0 }} transition={{ delay: 1.9, duration: 0.3 }} />
        <text x={x(15)} y={H + 8} textAnchor="middle" fontSize="11" fill="var(--muted)">Today</text>
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
        <div>
          <p className="text-[11.5px] text-muted">Actual MTD revenue</p>
          <p className="font-display tnum mt-0.5 text-[20px] font-semibold tracking-[-0.02em] text-ink">{f.forecast.actual}</p>
        </div>
        <div>
          <p className="text-[11.5px] text-muted">Projected month-end</p>
          <p className="font-display tnum mt-0.5 text-[20px] font-semibold tracking-[-0.02em] text-accent">
            {f.forecast.projected} <span className="text-[13px] font-medium text-good">↑ beats target</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- messenger */

function MessengerVisual() {
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
        <p className="text-[12px] font-medium text-muted"># {f.messenger.channel}</p>
        <div className="mt-3 flex gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink">
            <svg viewBox="0 0 28 28" className="size-5" aria-hidden="true">
              <path d="M7 18.5 11.5 14l3.5 3 6-7" fill="none" stroke="var(--bg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="21" cy="10" r="2.4" fill="var(--accent)" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px]">
              <span className="font-semibold text-ink">Grippi</span>{" "}
              <span className="rounded bg-line px-1 py-px text-[10px] font-semibold text-muted">APP</span>{" "}
              <span className="text-[12px] text-faint">{f.messenger.time}</span>
            </p>
            <p className="mt-1 text-[13.5px] font-semibold text-ink">Morning brief · Tuesday 15 May</p>
            <p className="mt-1 text-[13.5px] leading-[1.55] text-ink-2">{f.messenger.brief}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          ["Slack", "Slack"],
          ["WhatsApp", "WhatsApp"],
          ["Gmail", "Email"],
        ].map(([icon, label]) => (
          <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 ring-1 ring-line">
            <PlatformIcon name={icon} className="size-3.5 text-ink" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- alert */

function AlertVisual() {
  const pts = [3.4, 3.3, 3.1, 2.7, 2.3, 1.9];
  const d = `M${pts.map((v, i) => `${(i / 5) * 100},${40 - ((v - 1.6) / 2) * 34}`).join("L")}`;
  return (
    <div className="w-full rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bad-soft px-2 py-0.5 text-[11.5px] font-medium text-bad">
          <span className="size-1.5 rounded-full bg-current" /> Alert
        </span>
        <span className="text-[12px] text-faint">2 min ago</span>
      </div>
      <p className="mt-3 text-[14px] font-semibold text-ink">{f.alerts.client}</p>
      <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{f.alerts.text}</p>
      <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-4 h-12 w-full" aria-hidden="true">
        <path d={d} fill="none" stroke="var(--bad)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      </svg>
      <div className="mt-3 flex gap-2">
        <span className="inline-flex h-8 items-center rounded-full bg-ink px-3.5 text-[12.5px] font-medium text-bg">Pause campaign #7</span>
        <span className="inline-flex h-8 items-center rounded-full px-3.5 text-[12.5px] text-ink-2 ring-1 ring-line-2">Open account</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- slides */

function SlidesVisual() {
  const bars = [42, 58, 51, 66, 72, 84];
  return (
    <div className="relative w-full">
      <div className="relative mx-auto w-full max-w-[460px]">
        <div aria-hidden="true" className="absolute inset-x-6 -top-3 h-full rounded-2xl bg-surface-2 ring-1 ring-line" />
        <div aria-hidden="true" className="absolute inset-x-3 -top-1.5 h-full rounded-2xl bg-surface-2 ring-1 ring-line" />
        <div className="relative rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Weekly performance</p>
            <PlatformIcon name="Google Slides" className="size-4 text-[#FBBC04]" />
          </div>
          <p className="font-display mt-1.5 text-[18px] font-semibold tracking-[-0.02em] text-ink">Northfield Apparel</p>
          <div className="mt-4 grid grid-cols-[auto_1fr] gap-5">
            <div>
              <p className="text-[10.5px] text-muted">Blended ROAS</p>
              <p className="font-display tnum text-[24px] font-semibold tracking-[-0.03em] text-ink">4.8×</p>
              <p className="text-[10.5px] font-medium text-good">↑ 0.3 WoW</p>
            </div>
            <div className="flex h-[72px] items-end gap-1.5">
              {bars.map((b, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-[4px] ${i === bars.length - 1 ? "bg-accent" : "bg-line-2"}`}
                  style={{ height: `${b}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[12.5px] text-muted">
        Sent to client · Monday 8:00 AM · <span className="text-ink-2">ready to edit</span>
      </p>
    </div>
  );
}
