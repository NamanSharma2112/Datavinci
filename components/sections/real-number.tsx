"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { platformMeta, realNumber as r } from "@/content/site";
import { CountUp } from "../ui/count-up";
import { EASE, Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function RealNumber() {
  return (
    <section id="roas" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
        <div>
          <SectionHeading eyebrow={r.eyebrow} title={r.title} body={r.body} />
          <Reveal delay={0.1} className="mt-8 rounded-2xl bg-bg-2 p-5 ring-1 ring-line">
            <p className="font-mono text-[13px] text-ink-2">
              blended ROAS = <span className="text-ink">Σ revenue</span> ÷ <span className="text-ink">Σ ad spend</span>
            </p>
            <p className="mt-1.5 text-[13px] text-muted">Across every platform, de-duplicated. One number you can take to leadership.</p>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <RoasVisual />
        </Reveal>
      </div>
    </section>
  );
}

function RoasVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const total = r.claimedTotal;
  const pct = (v: number) => `${(v / total) * 100}%`;

  return (
    <div ref={ref} className="rounded-[24px] bg-surface p-5 shadow-[var(--shadow-float)] ring-1 ring-line sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-ink">Blended ROAS · real-time</p>
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="size-1.5 rounded-full bg-good" /> Live
        </span>
      </div>

      {/* What the platforms claim */}
      <div className="mt-7">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] text-muted">What your ad platforms claim</p>
          <p className="font-display text-[22px] font-semibold tracking-[-0.03em] text-faint line-through decoration-bad/60 decoration-2">
            <CountUp value={total} suffix="×" duration={1} delay={0.9} />
          </p>
        </div>
        <div className="mt-2.5 flex h-11 overflow-hidden rounded-xl bg-bg-2">
          {r.claimed.map((c, i) => (
            <motion.div
              key={c.p}
              className="flex h-full items-center overflow-hidden whitespace-nowrap px-3 text-[12.5px] font-medium text-white"
              style={{ background: platformMeta[c.p].color, width: pct(c.value), transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.45 }}
            >
              {c.label} {c.value}×
            </motion.div>
          ))}
        </div>
      </div>

      {/* What you actually made */}
      <div className="mt-7">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-medium text-ink">What you actually made</p>
          <p className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-accent">
            <CountUp value={r.real} suffix="×" duration={1} delay={1.6} />
          </p>
        </div>
        <div className="relative mt-2.5 h-11 overflow-hidden rounded-xl bg-bg-2">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center rounded-xl bg-accent px-3 text-[12.5px] font-medium text-white"
            style={{ width: pct(r.real), transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
          >
            Blended
          </motion.div>
          {/* The gap: revenue counted twice */}
          <motion.div
            className="absolute inset-y-0 right-0 flex items-center justify-center text-[12px] font-medium text-muted"
            style={{
              left: pct(r.real),
              backgroundImage:
                "repeating-linear-gradient(135deg, color-mix(in srgb, var(--bad) 22%, transparent) 0 6px, transparent 6px 12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            {(total - r.real).toFixed(1)}× counted twice
          </motion.div>
        </div>
      </div>

      <motion.p
        className="mt-6 flex items-start gap-2 rounded-xl bg-warn-soft px-3.5 py-3 text-[13px] leading-snug text-warn"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 6 }}
        transition={{ duration: 0.5, ease: EASE, delay: 2.5 }}
      >
        <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" aria-hidden="true">
          <path d="M8 2.2 14.5 13.5h-13L8 2.2Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M8 6.5v3M8 11.3v.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Meta + Google claimed ROAS adds to {total}×, but your actual blended return is {r.real}×. {r.warning}
      </motion.p>
    </div>
  );
}
