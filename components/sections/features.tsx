"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { features as f } from "@/content/site";
import { EASE, Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { PlatformIcon } from "../ui/platform-icon";
import { NumberAnimation } from "../ui/number-animation";
import { CardSwap } from "../ui/card-swap";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} />
        <div className="mt-14 grid gap-3 sm:gap-4 lg:grid-cols-12">
          <Tile className="lg:col-span-7" title={f.forecast.title} body={f.forecast.body} hint="Drag the slider">
            <Forecast />
          </Tile>
          <Tile className="lg:col-span-5" title={f.messenger.title} body={f.messenger.body} delay={0.06} hint="Live">
            <Messenger />
          </Tile>
          <Tile className="lg:col-span-5" title={f.alerts.title} body={f.alerts.body} hint="Live">
            <AlertTicker />
          </Tile>
          <Tile className="lg:col-span-7" title={f.slides.title} body={f.slides.body} delay={0.06} hint="Click or fling the card">
            <Reports />
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({
  title,
  body,
  hint,
  children,
  className = "",
  delay = 0,
}: {
  title: string;
  body: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`group relative flex flex-col overflow-hidden rounded-[24px] bg-surface ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)] ${className}`}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-7 sm:pb-0">
        <div>
          <h3 className="font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">{title}</h3>
          <p className="mt-1.5 max-w-md text-pretty text-[14.5px] leading-relaxed text-muted">{body}</p>
        </div>
        {hint ? (
          <span className="mt-1 hidden shrink-0 items-center gap-1.5 rounded-full bg-bg-2 px-2.5 py-1 text-[11.5px] text-muted ring-1 ring-line sm:inline-flex">
            {hint === "Live" ? <span className="size-1.5 animate-pulse rounded-full bg-good motion-reduce:animate-none" /> : null}
            {hint}
          </span>
        ) : null}
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-end px-4 pb-4 sm:px-6 sm:pb-6">{children}</div>
    </Reveal>
  );
}

/* -------------------------------------------------------------- forecast */

const TARGET = 80;
// Cumulative revenue ($K) by day, ending at $86K projected.
// Calibrated so day 15 reads $41.1K and projects to $86K, the figures on grippi.io.
const actualAt = (d: number) => (41.1 / 15) * d + 0.7 * (Math.sin(d * 0.9) - (Math.sin(13.5) * d) / 15);
// Projection: current daily pace carried to day 31, with a small momentum factor for the rising trend.
const MOMENTUM = 1.0125;

function Forecast() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [day, setDay] = useState(1);
  const touched = useRef(false);

  useEffect(() => {
    if (!inView || touched.current) return;
    if (reduced) {
      setDay(15);
      return;
    }
    const c = animate(1, 15, { duration: 1.6, ease: EASE, onUpdate: (v) => !touched.current && setDay(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced]);

  const W = 560;
  const H = 170;
  const maxV = 95;
  const x = (d: number) => ((d - 1) / 30) * W;
  const y = (k: number) => H - (k / maxV) * H;
  const mtd = actualAt(day);
  // Projection = current daily pace carried to day 31.
  const projected = day >= 31 ? mtd : (mtd / day) * 31 * MOMENTUM;
  const onTrack = projected >= TARGET;
  const actualPath = Array.from({ length: day }, (_, i) => `${i ? "L" : "M"}${x(i + 1).toFixed(1)},${y(actualAt(i + 1)).toFixed(1)}`).join("");

  return (
    <div ref={ref} className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">
          May revenue pacing · day <span className="tnum">{day}</span> of 31
        </p>
        <motion.span
          key={onTrack ? "on" : "off"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-full px-2 py-0.5 text-[11.5px] font-medium ${onTrack ? "bg-good-soft text-good" : "bg-warn-soft text-warn"}`}
        >
          {onTrack ? "On track" : "Behind pace"}
        </motion.span>
      </div>

      <svg viewBox={`-4 -8 ${W + 8} ${H + 22}`} className="mt-3 h-auto w-full overflow-visible" role="img" aria-label={`Revenue pacing chart at day ${day}: $${mtd.toFixed(1)}K so far, projected $${projected.toFixed(0)}K against an $80K target.`}>
        <line x1="0" x2={W} y1={y(TARGET)} y2={y(TARGET)} stroke="var(--muted)" strokeDasharray="4 4" strokeOpacity="0.55" />
        <text x="0" y={y(TARGET) - 7} fontSize="11" fill="var(--muted)">Target $80K</text>
        <path d={`${actualPath}L${x(day)},${H}L0,${H}Z`} fill="var(--ink)" fillOpacity="0.05" />
        <path d={actualPath} fill="none" stroke="var(--ink)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        {day < 31 ? (
          <path d={`M${x(day)},${y(mtd)}L${x(31)},${y(projected)}`} fill="none" stroke="var(--accent)" strokeWidth="2.25" strokeDasharray="5 5" strokeLinecap="round" />
        ) : null}
        <line x1={x(day)} x2={x(day)} y1="0" y2={H} stroke="var(--line-2)" />
        <circle cx={x(day)} cy={y(mtd)} r="5" fill="var(--ink)" stroke="var(--surface-2)" strokeWidth="2.5" />
        {day < 31 ? <circle cx={x(31)} cy={y(projected)} r="5" fill="var(--accent)" stroke="var(--surface-2)" strokeWidth="2.5" /> : null}
      </svg>

      <label className="mt-3 block">
        <span className="sr-only">Day of month</span>
        <input
          type="range"
          min={1}
          max={31}
          value={day}
          onChange={(e) => {
            touched.current = true;
            setDay(Number(e.target.value));
          }}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--accent)] [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_var(--surface-2)]"
        />
      </label>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
        <div>
          <p className="text-[11.5px] text-muted">Revenue so far</p>
          <p className="font-display mt-0.5 text-[21px] font-semibold tracking-[-0.02em] text-ink">
            <NumberAnimation value={`$${mtd.toFixed(1)}K`} duration={0.45} stagger={0.03} spins={0} />
          </p>
        </div>
        <div>
          <p className="text-[11.5px] text-muted">Projected month-end</p>
          <p className="font-display mt-0.5 text-[21px] font-semibold tracking-[-0.02em] text-accent">
            <NumberAnimation value={`$${projected.toFixed(0)}K`} duration={0.45} stagger={0.03} spins={0} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- messenger */

const MESSAGES = [
  { kind: "brief", title: "Morning brief · Tue 15 May", text: f.messenger.brief },
  { kind: "alert", title: "Alert · NightShift Coffee", text: "ROAS dropped to 1.9× (was 3.4×). Recommend pausing Google campaign #7." },
  { kind: "report", title: "Report delivered · Northfield Apparel", text: "Weekly deck sent to client. Google Slides ready to edit." },
  { kind: "brief", title: "Forecast · Day 15 of 31", text: "On track: projected $86K vs $80K target. No action needed." },
] as const;

const CHANNELS = [
  { id: "slack", label: "Slack", icon: "Slack" },
  { id: "whatsapp", label: "WhatsApp", icon: "WhatsApp" },
  { id: "email", label: "Email", icon: "Gmail" },
] as const;

function Messenger() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(1);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]["id"]>("slack");

  useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setInterval(() => setCount((c) => c + 1), 2600);
    return () => window.clearInterval(t);
  }, [inView, reduced]);

  const shown = Array.from({ length: Math.min(3, count) }, (_, i) => {
    const idx = (count - 1 - i) % MESSAGES.length;
    return { ...MESSAGES[idx], id: count - i };
  });

  return (
    <div ref={ref}>
      <div className="relative h-[268px] overflow-hidden rounded-2xl bg-surface-2 p-3 ring-1 ring-line">
        <p className="px-1 pb-2 text-[12px] font-medium text-muted">
          {channel === "slack" ? "# grippi-daily" : channel === "whatsapp" ? "Grippi · WhatsApp" : "Inbox · reports@grippi.io"}
        </p>
        <ul className="space-y-2">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((m, i) => (
              <motion.li
                key={m.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.97 }}
                animate={{ opacity: i === 2 ? 0.45 : 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex gap-2.5 rounded-xl bg-surface p-3 ring-1 ring-line"
              >
                <span
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${
                    m.kind === "alert" ? "bg-bad-soft text-bad" : m.kind === "report" ? "bg-good-soft text-good" : "bg-ink text-bg"
                  }`}
                >
                  <svg viewBox="0 0 28 28" className="size-4" aria-hidden="true">
                    <path d="M7 18.5 11.5 14l3.5 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-ink">
                    {m.title} <span className="ml-1 text-[11px] font-normal text-faint">now</span>
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink-2">{m.text}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-2 to-transparent" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Delivery channel">
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={channel === c.id}
            onClick={() => setChannel(c.id)}
            className={`press inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] ring-1 ${
              channel === c.id ? "bg-ink text-bg ring-ink" : "text-ink-2 ring-line hover:ring-line-2"
            }`}
          >
            <PlatformIcon name={c.icon} className="size-3.5" />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- alert ticker */

const TICK = [3.4, 3.35, 3.3, 3.2, 3.15, 3.0, 2.85, 2.7, 2.5, 2.3, 2.1, 1.9];
const THRESH = 2.5;

function AlertTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();
  const [i, setI] = useState(reduced ? TICK.length - 1 : 0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || reduced || paused) return;
    const t = window.setInterval(() => setI((v) => (v >= TICK.length + 5 ? 0 : v + 1)), 420);
    return () => window.clearInterval(t);
  }, [inView, reduced, paused]);

  const n = Math.min(i, TICK.length - 1);
  const fired = TICK[n] < THRESH;
  const W = 300;
  const H = 90;
  const x = (k: number) => (k / (TICK.length - 1)) * W;
  const y = (v: number) => H - ((v - 1.6) / 2) * H;
  const path = TICK.slice(0, n + 1).map((v, k) => `${k ? "L" : "M"}${x(k)},${y(v)}`).join("");

  return (
    <div ref={ref} className="rounded-2xl bg-surface-2 p-4 ring-1 ring-line">
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] font-medium text-ink">NightShift Coffee · ROAS</p>
        <p className={`font-display text-[20px] font-semibold tracking-[-0.02em] transition-colors ${fired ? "text-bad" : "text-ink"}`}>
          <NumberAnimation value={`${TICK[n].toFixed(1)}×`} duration={0.35} spins={0} stagger={0.02} />
        </p>
      </div>
      <svg viewBox={`-4 -6 ${W + 8} ${H + 12}`} className="mt-2 h-24 w-full overflow-visible" aria-hidden="true">
        <line x1="0" x2={W} y1={y(THRESH)} y2={y(THRESH)} stroke="var(--bad)" strokeOpacity="0.5" strokeDasharray="3 4" />
        <text x={W} y={y(THRESH) - 5} textAnchor="end" fontSize="10.5" fill="var(--bad)" opacity="0.8">Alert below 2.5×</text>
        <path d={path} fill="none" stroke={fired ? "var(--bad)" : "var(--ink)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={x(n)} cy={y(TICK[n])} r="4" fill={fired ? "var(--bad)" : "var(--ink)"} />
        {fired ? (
          <circle cx={x(n)} cy={y(TICK[n])} r="4" fill="none" stroke="var(--bad)" className="origin-center animate-ping motion-reduce:animate-none" style={{ transformBox: "fill-box" }} />
        ) : null}
      </svg>
      <div className="mt-3 h-[92px]">
        <AnimatePresence mode="wait">
          {fired ? (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-xl bg-surface p-3 ring-1 ring-bad/30"
            >
              <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-bad">
                <span className="size-1.5 rounded-full bg-current" /> Alert sent to #grippi-daily
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-ink-2">{f.alerts.text}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="press h-7 rounded-full bg-ink px-3 text-[12px] font-medium text-bg"
                >
                  {paused ? "Campaign paused ✓" : "Pause campaign #7"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p key="watch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center justify-center rounded-xl border border-dashed border-line text-[12.5px] text-faint">
              Watching 24 accounts…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- reports */

function Slide({
  kind,
  client,
  kpi,
  kpiLabel,
  delta,
  children,
}: {
  kind: string;
  client: string;
  kpi: string;
  kpiLabel: string;
  delta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">{kind}</p>
        <PlatformIcon name="Google Slides" className="size-4 text-[#F2A20C]" />
      </div>
      <p className="font-display mt-1 text-[18px] font-semibold tracking-[-0.02em] text-ink">{client}</p>
      <div className="mt-auto flex items-end gap-5">
        <div className="shrink-0">
          <p className="text-[10.5px] text-muted">{kpiLabel}</p>
          <p className="font-display tnum text-[28px] font-semibold leading-none tracking-[-0.03em] text-ink">{kpi}</p>
          <p className="mt-1 text-[10.5px] font-medium text-good">{delta}</p>
        </div>
        <div className="h-[84px] min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

const Bars = ({ v }: { v: number[] }) => (
  <div className="flex h-full items-end gap-1.5">
    {v.map((b, i) => (
      <span key={i} className={`flex-1 rounded-t-[4px] ${i === v.length - 1 ? "bg-accent" : "bg-line-2"}`} style={{ height: `${b}%` }} />
    ))}
  </div>
);

const Split = () => (
  <div className="flex h-full flex-col justify-end gap-1.5">
    {[
      ["Meta", 46, "var(--p-meta)"],
      ["Google", 26, "var(--p-google)"],
      ["Shopify", 14, "var(--p-shopify)"],
    ].map(([l, p, c]) => (
      <div key={l as string} className="flex items-center gap-2 text-[10px] text-muted">
        <span className="w-10">{l}</span>
        <span className="h-1.5 flex-1 rounded-full bg-line">
          <span className="block h-full rounded-full" style={{ width: `${(p as number) * 2}%`, background: c as string }} />
        </span>
      </div>
    ))}
  </div>
);

const Line = () => (
  <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full">
    <path d="M0,40 L15,36 L30,38 L45,28 L60,24 L75,16 L100,8" fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    <path d="M0,40 L15,36 L30,38 L45,28 L60,24 L75,16 L100,8 L100,50 L0,50Z" fill="var(--accent)" fillOpacity="0.1" />
  </svg>
);

function Reports() {
  const cards = [
    { key: "a", title: "Weekly performance, Northfield Apparel", node: <Slide kind="Weekly performance" client="Northfield Apparel" kpi="4.8×" kpiLabel="Blended ROAS" delta="↑ 0.3 WoW"><Bars v={[42, 58, 51, 66, 72, 84]} /></Slide> },
    { key: "b", title: "Channel mix, Crestline Sports", node: <Slide kind="Channel mix" client="Crestline Sports" kpi="$9.6K" kpiLabel="Ad spend" delta="↓ 4% MoM"><Split /></Slide> },
    { key: "c", title: "Month-end forecast, Verdant Wellness", node: <Slide kind="Month-end forecast" client="Verdant Wellness" kpi="104%" kpiLabel="Of target" delta="On track"><Line /></Slide> },
    { key: "d", title: "Performance audit, Halo Active", node: <Slide kind="Performance audit" client="Halo Active" kpi="3.9×" kpiLabel="Blended ROAS" delta="↑ 0.2 WoW"><Bars v={[60, 55, 64, 58, 70, 74]} /></Slide> },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[400px] pb-6 pr-16 pt-14">
        <CardSwap cards={cards} label="Client report slides" className="aspect-[16/10] w-full" />
      </div>
      <p className="mt-2 text-center text-[12.5px] text-muted">
        Sent to clients · Monday 8:00 AM · <span className="text-ink-2">editable in Google Slides</span>
      </p>
    </div>
  );
}
