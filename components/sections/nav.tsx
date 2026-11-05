"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { links, nav, offer } from "@/content/site";
import { Logo } from "../ui/logo";
import { Arrow } from "../ui/button";
import { EASE } from "../ui/reveal";
import { Segmented } from "../ui/segmented";
import { useTheme, type ThemePref } from "../ui/use-theme";

/** Which nav section is under the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);
  return active;
}

const IDS = nav.map((n) => n.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection(IDS);
  const highlight = hovered ?? active;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Lock page scroll and listen for Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const compact = scrolled && !open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
        <div
          className={`mx-auto flex h-14 items-center justify-between rounded-full pl-4 pr-2 transition-[max-width,background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-quint)] sm:pl-5 ${
            compact
              ? "max-w-[920px] bg-surface/90 shadow-[0_0_0_1px_var(--line),0_12px_32px_-14px_rgb(0_0_0/0.22)] backdrop-blur-xl backdrop-saturate-150"
              : "max-w-[1200px] bg-transparent shadow-[0_0_0_1px_transparent]"
          }`}
        >
          <a href="#top" aria-label="Grippi home" className="press -ml-1 flex items-center rounded-full px-1 py-1" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {nav.map((n) => {
                const id = n.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      onMouseEnter={() => setHovered(id)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-3.5 py-1.5 text-[14px] transition-colors duration-200 ${
                        highlight === id || isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {highlight === id ? (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                          className="absolute inset-0 rounded-full bg-ink/[0.06] dark:bg-white/[0.08]"
                        />
                      ) : null}
                      <span className="relative">{n.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeButton />
            <a
              href={links.signIn}
              className={`hidden rounded-full px-3 py-1.5 text-[14px] text-muted transition-colors hover:text-ink md:block ${compact ? "lg:hidden xl:block" : ""}`}
            >
              Sign in
            </a>
            <a
              href={links.app}
              className={`press group ml-1 hidden h-10 items-center gap-1.5 rounded-full bg-ink pl-4 pr-3.5 text-[14px] font-medium text-bg shadow-[0_1px_2px_rgb(0_0_0/0.18)] hover:opacity-90 ${open ? "" : "sm:inline-flex"}`}
            >
              {offer.cta}
              <Arrow />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="press ml-1 grid size-10 place-items-center rounded-full text-ink hover:bg-ink/[0.06] lg:hidden"
            >
              <span className="relative block h-3 w-[18px]">
                <span className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ease-[var(--ease-out-quint)] ${open ? "top-[5px] rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ease-[var(--ease-out-quint)] ${open ? "top-[5px] -rotate-45" : "top-[8.5px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? <MobileSheet onClose={() => setOpen(false)} active={active} /> : null}
      </AnimatePresence>
    </>
  );
}

function ThemeButton() {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="press relative grid size-10 place-items-center overflow-hidden rounded-full text-muted hover:bg-ink/[0.06] hover:text-ink"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={theme}
          viewBox="0 0 16 16"
          className="size-[17px]"
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
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

export function ThemeSegmented({ size = "sm" }: { size?: "sm" | "md" }) {
  const [, setTheme, pref] = useTheme();
  return (
    <Segmented<ThemePref>
      label="Theme"
      size={size}
      value={pref}
      onChange={setTheme}
      options={[
        { id: "light", label: "Light" },
        { id: "dark", label: "Dark" },
        { id: "system", label: "System" },
      ]}
    />
  );
}

function MobileSheet({ onClose, active }: { onClose: () => void; active: string | null }) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-40 flex flex-col bg-bg px-5 pb-8 pt-24 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul>
          {nav.map((n, i) => {
            const isActive = active === n.href.slice(1);
            return (
              <motion.li
                key={n.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.04 + i * 0.045 }}
                className="border-b border-line"
              >
                <a href={n.href} onClick={onClose} className="group flex items-center justify-between py-4">
                  <span className={`font-display text-[30px] font-semibold tracking-[-0.035em] ${isActive ? "text-accent" : "text-ink"}`}>{n.label}</span>
                  <span className="font-mono text-[12px] text-faint transition-transform duration-200 group-active:translate-x-1">0{i + 1}</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
        className="mt-auto space-y-5"
      >
        <a href={links.app} className="press group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-[15.5px] font-medium text-white">
          {offer.long} <Arrow />
        </a>
        <div className="flex items-center justify-between">
          <a href={links.signIn} className="text-[15px] text-ink-2">
            Sign in
          </a>
          <ThemeSegmented />
        </div>
      </motion.div>
    </motion.div>
  );
}
