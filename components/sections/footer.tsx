"use client";

import { motion } from "motion/react";
import { concept, footer } from "@/content/site";
import { Logo } from "../ui/logo";
import { EASE } from "../ui/reveal";
import { PlatformIcon } from "../ui/platform-icon";
import { ThemeSegmented } from "./nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pt-20 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="max-w-sm">
            <Logo />
            <p className="font-display mt-5 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-ink">{footer.tagline}</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{footer.blurb}</p>
            <div className="mt-7">
              <p className="text-[12px] font-medium text-faint">Works with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {footer.worksWith.map((p) => (
                  <li key={p}>
                    <span
                      title={p}
                      className="grid size-9 place-items-center rounded-xl bg-surface text-muted ring-1 ring-line transition-colors duration-200 hover:text-ink hover:ring-line-2"
                    >
                      <PlatformIcon name={p} className="size-4" />
                      <span className="sr-only">{p}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <p className="text-[13px] font-medium text-ink">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="group inline-flex items-center gap-1 text-[14px] text-muted transition-colors hover:text-ink">
                        {label}
                        {href.startsWith("http") ? (
                          <svg viewBox="0 0 12 12" className="size-2.5 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true">
                            <path d="M4 2.5h5.5V8M9.5 2.5 3 9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] leading-relaxed text-faint">
            © {new Date().getFullYear()} Grippi · {concept.note} Designed &amp; built by{" "}
            <a href={concept.authorUrl} className="text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-ink">
              {concept.author}
            </a>
          </p>
          <div className="flex items-center gap-3">
            <ThemeSegmented />
            <a
              href="#top"
              aria-label="Back to top"
              className="press grid size-9 place-items-center rounded-full text-muted ring-1 ring-line hover:text-ink hover:ring-line-2"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
                <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge. Decorative. */}
      <div aria-hidden="true" className="pointer-events-none mx-auto mt-10 max-w-[1200px] select-none overflow-hidden">
        <motion.p
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "22%", opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-display text-center text-[26vw] font-bold leading-[0.8] tracking-[-0.06em] lg:text-[300px]"
          style={{
            backgroundImage: "linear-gradient(to bottom, color-mix(in srgb, var(--ink) 9%, transparent) 0%, color-mix(in srgb, var(--ink) 12%, transparent) 40%, transparent 92%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Grippi
        </motion.p>
      </div>
    </footer>
  );
}
