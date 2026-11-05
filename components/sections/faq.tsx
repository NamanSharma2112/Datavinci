"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "@/content/site";
import { EASE } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        <ul className="border-t border-line">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className="border-b border-line">
                <h3>
                  <button
                    id={`${base}-q${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16.5px] font-medium tracking-[-0.01em] text-ink">{it.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative grid size-7 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-200 ${
                        isOpen ? "bg-ink ring-ink" : "ring-line-2 group-hover:ring-faint"
                      }`}
                    >
                      <span className={`absolute h-[1.5px] w-3 rounded ${isOpen ? "bg-bg" : "bg-ink"}`} />
                      <span className={`absolute h-3 w-[1.5px] rounded transition-transform duration-300 ease-[var(--ease-out-quint)] ${isOpen ? "scale-y-0 bg-bg" : "bg-ink"}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`${base}-a${i}`}
                      role="region"
                      aria-labelledby={`${base}-q${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-10 text-pretty text-[15.5px] leading-relaxed text-muted">{it.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
