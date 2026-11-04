"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { BorderBeam } from "border-beam";
import { ThinkingOrb } from "thinking-orbs";
import { demo } from "@/content/site";

type Phase = "idle" | "typing" | "ready" | "running" | "done";

const EASE = [0.23, 1, 0.32, 1] as const;
const TYPE_MS = 24; // per character
const STEP_MS = 1500; // per agent step — the whole run is ~6s, so a beam is warranted

export function AgentDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(-1); // index of the step currently running
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const run = useCallback(() => {
    clear();
    setPhase("running");
    setStep(0);
    demo.steps.forEach((_, i) => {
      if (i > 0) later(() => setStep(i), STEP_MS * i);
    });
    later(() => {
      setStep(demo.steps.length);
      setPhase("done");
    }, STEP_MS * demo.steps.length);
  }, []);

  const start = useCallback(() => {
    clear();
    setStep(-1);
    if (reduced) {
      setTyped(demo.prompt.length);
      setPhase("ready");
      later(run, 600);
      return;
    }
    setTyped(0);
    setPhase("typing");
    for (let i = 1; i <= demo.prompt.length; i++) {
      later(() => setTyped(i), 350 + i * TYPE_MS);
    }
    const typedAt = 350 + demo.prompt.length * TYPE_MS;
    later(() => setPhase("ready"), typedAt);
    later(run, typedAt + 650);
  }, [reduced, run]);

  useEffect(() => {
    if (inView && phase === "idle") start();
  }, [inView, phase, start]);

  useEffect(() => clear, []);

  const running = phase === "running";
  const status =
    phase === "running" ? "Running" : phase === "done" ? "Needs review" : "Draft";

  return (
    <div ref={rootRef} className="relative">
      {/* Soft accent light behind the card, so it sits on the page instead of floating. */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[48px] bg-[radial-gradient(60%_50%_at_60%_40%,rgb(255_90_31/0.10),transparent_70%)]"
      />

      <div className="overflow-hidden rounded-[22px] bg-surface shadow-[var(--shadow-float)] ring-1 ring-ink/[0.07]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2 font-mono text-[11.5px] text-muted">
            <span className="text-ink">runs</span>
            <span className="text-faint">/</span>
            <span>weekly-signups</span>
          </div>
          <StatusPill status={status} />
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Composer — the beam runs only while the agent is actually working */}
          <BorderBeam
            size="md"
            colorVariant="sunset"
            theme="light"
            active={running && !reduced}
            strength={0.85}
          >
            <div className="rounded-2xl border border-line bg-paper/60 p-4">
              <p className="sr-only">Request: {demo.prompt}</p>
              <p aria-hidden="true" className="min-h-[72px] text-[15px] leading-[1.6] text-ink">
                {demo.prompt.slice(0, typed)}
                {phase === "typing" || phase === "idle" ? (
                  <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-accent" />
                ) : null}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[11px] text-faint">⌘ ↵ to run</span>
                <button
                  type="button"
                  onClick={phase === "done" ? start : undefined}
                  disabled={phase !== "done"}
                  aria-label={phase === "done" ? "Replay demo" : "Run"}
                  className="press inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3 text-[13px] font-medium text-white disabled:cursor-default enabled:hover:bg-ink-2"
                >
                  {phase === "done" ? (
                    <>
                      <ReplayIcon /> Replay
                    </>
                  ) : running ? (
                    "Working…"
                  ) : (
                    <>
                      Run <ReturnIcon />
                    </>
                  )}
                </button>
              </div>
            </div>
          </BorderBeam>

          {/* Steps */}
          <ol className="relative space-y-0.5" aria-live="polite">
            {demo.steps.map((s, i) => {
              const state = step > i ? "done" : step === i ? "active" : "pending";
              return (
                <li key={s.label}>
                  <motion.div
                    initial={false}
                    animate={{ opacity: state === "pending" ? 0.38 : 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-10 items-center gap-3 rounded-xl px-2"
                  >
                    <span className="grid size-5 shrink-0 place-items-center">
                      {state === "active" ? (
                        <ThinkingOrb state={s.state} size={20} theme="light" aria-hidden="true" />
                      ) : state === "done" ? (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="grid size-[18px] place-items-center rounded-full bg-ink text-white"
                        >
                          <CheckIcon />
                        </motion.span>
                      ) : (
                        <span className="size-[7px] rounded-full border border-line-2" />
                      )}
                    </span>
                    <span className="relative h-5 flex-1 overflow-hidden text-[14px]">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={state === "done" ? "done" : "label"}
                          initial={{ y: 12, opacity: 0, filter: "blur(2px)" }}
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: -12, opacity: 0, filter: "blur(2px)" }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className={`absolute inset-0 truncate ${state === "done" ? "text-muted" : "text-ink"}`}
                        >
                          {state === "done" ? s.done : s.label}
                          {state === "active" ? "…" : ""}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-faint">
                      {state === "done" ? `${(1.1 + i * 0.3).toFixed(1)}s` : ""}
                    </span>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Result */}
          <div className="relative min-h-[92px]">
            <AnimatePresence mode="wait" initial={false}>
              {phase === "done" ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-paper/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[14.5px] font-medium text-ink">{demo.result.title}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-muted">{demo.result.body}</p>
                  </div>
                  <span className="inline-flex h-8 shrink-0 items-center self-start rounded-full bg-accent px-3.5 text-[13px] font-medium text-white sm:self-auto">
                    {demo.result.approve}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid h-[92px] place-items-center rounded-2xl border border-dashed border-line text-[13px] text-faint"
                >
                  {running ? "Waiting on the last step" : "Results land here for your review"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-faint">{demo.caption}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Running"
      ? "bg-accent/10 text-accent-ink"
      : status === "Needs review"
        ? "bg-ok/10 text-ok"
        : "bg-ink/[0.05] text-muted";
  return (
    <span className={`relative inline-flex h-6 items-center gap-1.5 overflow-hidden rounded-full px-2.5 text-[11.5px] font-medium transition-colors duration-300 ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 opacity-70" aria-hidden="true">
      <path d="M12.5 3.5v4a2 2 0 0 1-2 2h-7M6 6.5l-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <path d="M3 8a5 5 0 1 0 1.5-3.5M3 2.5v2.5h2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
