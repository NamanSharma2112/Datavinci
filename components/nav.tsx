"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand, nav } from "@/content/site";
import { Logo } from "./logo";
import { Button } from "./button";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div
        className={`mx-auto flex h-14 max-w-[1160px] items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-paper/80 shadow-[0_0_0_1px_rgb(18_18_17/0.07),0_8px_24px_-12px_rgb(18_18_17/0.18)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Link href="#top" aria-label={`${brand.name} home`} className="press rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors duration-150 hover:bg-ink/[0.05] hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={brand.signInUrl}
            className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink sm:block"
          >
            Sign in
          </a>
          <Button href={brand.appUrl} size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="press grid size-10 place-items-center rounded-full text-ink hover:bg-ink/[0.05] md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "top-[5px] rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "top-[5px] -rotate-45" : "top-[8.5px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto mt-2 max-w-[1160px] rounded-3xl bg-paper/95 p-2 shadow-[0_0_0_1px_rgb(18_18_17/0.07),0_16px_40px_-16px_rgb(18_18_17/0.25)] backdrop-blur-xl md:hidden"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-[16px] text-ink hover:bg-ink/[0.04]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-1 grid grid-cols-2 gap-2 border-t border-line p-2 pt-3">
              <Button href={brand.signInUrl} variant="secondary">
                Sign in
              </Button>
              <Button href={brand.appUrl}>Get started</Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
