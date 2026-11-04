"use client";

import { motion } from "motion/react";
import { brand, hero } from "@/content/site";
import { AgentDemo } from "./agent-demo";
import { Arrow, Button } from "./button";

const EASE = [0.23, 1, 0.32, 1] as const;

const item = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-24">
      <div aria-hidden="true" className="grid-paper absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        >
          <motion.a
            variants={item}
            href="#how"
            className="press group inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface/70 py-1 pl-1 pr-3 text-[13px] text-ink-2 backdrop-blur hover:border-faint"
          >
            <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white">
              New
            </span>
            {hero.eyebrow}
            <Arrow />
          </motion.a>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.045em] text-ink sm:text-[64px] lg:text-[72px]"
          >
            {hero.titleStart}
            <span className="relative inline-block font-serif font-normal tracking-[-0.02em]">
              {hero.titleAccent}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.17em] left-[-2%] h-[0.14em] w-[104%] text-accent"
              >
                <motion.path
                  d="M2 8.5C30 3 70 2.5 118 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                />
              </svg>
            </span>
            {hero.titleEnd}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[34rem] text-pretty text-[18px] leading-relaxed text-muted"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={brand.appUrl} className="group">
              {hero.primaryCta}
              <Arrow />
            </Button>
            <Button href="#product" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-4 font-mono text-[11.5px] text-faint">
            {hero.footnote}
          </motion.p>
        </motion.div>

        <motion.div
          id="product"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        >
          <AgentDemo />
        </motion.div>
      </div>
    </section>
  );
}
