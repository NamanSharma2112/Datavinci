"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "@/content/site";
import { SectionHeading } from "./section-heading";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1160px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <ul className="border-t border-line">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${base}-q${i}`;
            const panelId = `${base}-a${i}`;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[17px] font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-ink-2">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative grid size-7 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-200 ${
                        isOpen ? "bg-ink ring-ink" : "ring-line-2 group-hover:ring-faint"
                      }`}
                    >
                      <span className={`absolute h-[1.5px] w-3 rounded ${isOpen ? "bg-white" : "bg-ink"}`} />
                      <span
                        className={`absolute h-3 w-[1.5px] rounded transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                          isOpen ? "scale-y-0 bg-white" : "bg-ink"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-12 text-pretty text-[15.5px] leading-relaxed text-muted">{item.a}</p>
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
