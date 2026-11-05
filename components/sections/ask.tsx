"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { BorderBeam } from "border-beam";
import { ThinkingOrb } from "thinking-orbs";
import { ask } from "@/content/site";
import { EASE, Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { PlatformIcon } from "../ui/platform-icon";
import { useTheme } from "../ui/use-theme";

type Phase = "idle" | "thinking" | "answering" | "done";
const THINK_MS = 2600;

export function Ask() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [words, setWords] = useState(0);
  const timers = useRef<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [theme] = useTheme();

  const answer = ask.items[active].a.split(" ");

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(
    (i: number) => {
      clear();
      setActive(i);
      setWords(0);
      const total = ask.items[i].a.split(" ").length;
      if (reduced) {
        setWords(total);
        setPhase("done");
        return;
      }
      setPhase("thinking");
      timers.current.push(
        window.setTimeout(() => {
          setPhase("answering");
          for (let w = 1; w <= total; w++) {
            timers.current.push(window.setTimeout(() => setWords(w), w * 38));
          }
          timers.current.push(window.setTimeout(() => setPhase("done"), total * 38 + 50));
        }, THINK_MS),
      );
    },
    [reduced],
  );

  useEffect(() => {
    if (inView && phase === "idle") run(0);
  }, [inView, phase, run]);

  useEffect(() => clear, []);

  return (
    <section id="ask" className="scroll-mt-20 border-t border-line bg-bg-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading eyebrow={ask.eyebrow} title={ask.title} body={ask.body} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <ul className="space-y-1.5" role="list">
              {ask.items.map((it, i) => {
                const on = i === active;
                return (
                  <li key={it.q}>
                    <button
                      type="button"
                      onClick={() => run(i)}
                      aria-pressed={on}
                      className={`press relative flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 text-left text-[15px] leading-snug ${
                        on ? "text-ink" : "text-muted hover:bg-surface/60 hover:text-ink"
                      }`}
                    >
                      {on ? (
                        <motion.span
                          layoutId="ask-active"
                          transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
                          className="absolute inset-0 rounded-2xl bg-surface shadow-[var(--shadow-card)] ring-1 ring-line"
                        />
                      ) : null}
                      <span className={`relative mt-[3px] font-mono text-[11px] ${on ? "text-accent" : "text-faint"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative">{it.q}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 flex items-center gap-2 px-4 text-[13px] text-muted">
              <PlatformIcon name="Claude" className="size-4 text-[#D97757]" />
              Also works inside Claude and ChatGPT via MCP.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div ref={panelRef} className="flex h-full min-h-[360px] flex-col rounded-[24px] bg-surface p-4 shadow-[var(--shadow-float)] ring-1 ring-line sm:p-6">
              <div className="flex-1 space-y-4" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`q-${active}-${phase === "idle"}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[14.5px] leading-snug text-bg"
                  >
                    {ask.items[active].q}
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft ring-1 ring-accent/20">
                    <svg viewBox="0 0 28 28" className="size-4" aria-hidden="true">
                      <path d="M7 18.5 11.5 14l3.5 3 6-7" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    {phase === "thinking" ? (
                      <p className="flex items-center gap-2 text-[14px] text-muted">
                        <ThinkingOrb state="searching" size={20} theme={theme} aria-hidden="true" />
                        {ask.thinking}…
                      </p>
                    ) : (
                      <p className="text-[15.5px] leading-[1.65] text-ink">
                        {answer.slice(0, words).map((w, i) => (
                          <motion.span
                            key={`${active}-${i}`}
                            initial={reduced ? false : { opacity: 0, filter: "blur(4px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.25 }}
                          >
                            {w}{" "}
                          </motion.span>
                        ))}
                      </p>
                    )}
                    {phase === "done" ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-[12px] text-faint"
                      >
                        Sources: Meta Ads · Google Ads · Shopify · Amazon · TikTok
                      </motion.p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Composer — the beam runs only while Grippi is working on an answer */}
              <BorderBeam size="line" colorVariant="ocean" theme={theme} active={phase === "thinking" && !reduced} className="mt-6">
                <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3 ring-1 ring-line">
                  <span className="flex-1 truncate text-[14px] text-faint">Ask about your marketing…</span>
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-bg">
                    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
                      <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </BorderBeam>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
