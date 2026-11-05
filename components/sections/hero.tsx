"use client";

import { motion } from "motion/react";
import { hero, links, offer } from "@/content/site";
import { Arrow, Button, Check } from "../ui/button";
import { EASE } from "../ui/reveal";
import { DashboardPreview } from "./dashboard-preview";

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section id="top" className="relative isolate pt-28 sm:pt-36">
      {/* Soft violet wash at the top; fades to the page colour. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_srgb,var(--accent)_11%,transparent),transparent_70%)]"
      />

      <motion.div
        className="mx-auto max-w-[1200px] px-4 text-center sm:px-6"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      >
        <motion.a
          variants={item}
          href="#ask"
          className="press group inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-[13px] text-ink-2 shadow-[var(--shadow-card)] ring-1 ring-line hover:ring-line-2"
        >
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11.5px] font-semibold text-accent-ink">MCP</span>
          {hero.badge}
          <Arrow />
        </motion.a>

        <motion.h1
          variants={item}
          className="font-display mx-auto mt-7 max-w-[1000px] text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-[60px] lg:text-[72px]"
        >
          <span className="block">{hero.titleA}</span>
          <span className="block text-faint">{hero.titleB}</span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-[40rem] text-pretty text-[17px] leading-relaxed text-muted sm:text-[18.5px]">
          {hero.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={links.app} variant="accent" size="lg">
            {offer.long}
            <Arrow />
          </Button>
          <Button href="#product" variant="secondary" size="lg">
            See it live
          </Button>
        </motion.div>

        <motion.ul variants={item} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted">
          {offer.reassurance.map((r) => (
            <li key={r} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-good" />
              {r}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        id="product"
        className="relative mx-auto mt-14 max-w-[1200px] scroll-mt-24 px-3 sm:mt-16 sm:px-6"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
      >
        <div aria-hidden="true" className="dots absolute inset-x-0 -top-6 bottom-24 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
        <DashboardPreview />
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-[14px] text-muted sm:px-6">
        <span>
          Trusted by <strong className="font-semibold text-ink">{hero.proof.count}</strong> {hero.proof.label}
        </span>
        <span className="hidden h-4 w-px bg-line-2 sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="tracking-[0.1em] text-[#f5a524]" aria-hidden="true">★★★★★</span>
          <strong className="font-semibold text-ink">{hero.proof.rating}</strong> {hero.proof.ratingLabel}
        </span>
      </div>
    </section>
  );
}
