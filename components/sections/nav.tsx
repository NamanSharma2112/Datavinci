"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { links, nav, offer } from "@/content/site";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { EASE } from "../ui/reveal";
import { useTheme } from "../ui/use-theme";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <a href="#top" aria-label="Grippi home" className="press rounded-lg">
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:bg-bg-2 hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a href={links.signIn} className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink sm:block">
              Sign in
            </a>
            <Button href={links.app} size="sm" variant="primary" className="hidden sm:inline-flex">
              {offer.cta}
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="press grid size-10 place-items-center rounded-full text-ink hover:bg-bg-2 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ease-[var(--ease-out-quint)] ${open ? "top-[5px] rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ease-[var(--ease-out-quint)] ${open ? "top-[5px] -rotate-45" : "top-[8.5px]"}`} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mx-auto max-w-[1200px] px-4 pb-4 sm:px-6">
                <ul className="border-t border-line pt-2">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-2 py-3 text-[16px] text-ink hover:bg-bg-2">
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button href={links.signIn} variant="secondary">Sign in</Button>
                  <Button href={links.app}>{offer.cta}</Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="press relative grid size-9 place-items-center overflow-hidden rounded-full text-ink-2 ring-1 ring-line hover:text-ink hover:ring-line-2"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={theme}
          viewBox="0 0 16 16"
          className="size-4"
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden="true"
        >
          {dark ? (
            <path d="M13.5 9.6A5.6 5.6 0 0 1 6.4 2.5a5.6 5.6 0 1 0 7.1 7.1Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          ) : (
            <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <circle cx="8" cy="8" r="2.8" />
              <path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
            </g>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
