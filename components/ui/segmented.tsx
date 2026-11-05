"use client";

/**
 * Segmented control with a sliding thumb and arrow-key support.
 * Adapted from ObsidianUI "Analytics Dashboard" (https://www.obsidianui.dev), MIT License.
 */
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

type Option<T extends string> = { id: T; label: ReactNode };

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "md",
  className = "",
}: {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (next: T) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const index = Math.max(0, options.findIndex((o) => o.id === value));

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].id);
    e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]")[next]?.focus();
  }

  const h = size === "sm" ? "h-7 text-[12px]" : "h-8 text-[13px]";
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      style={{ "--n": options.length, "--i": index } as CSSProperties}
      className={`relative grid auto-cols-fr grid-flow-col rounded-[10px] bg-ink/[0.055] p-[3px] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-[3px] left-[3px] top-[3px] rounded-[7px] bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_rgb(0_0_0/0.04)] transition-transform duration-300 ease-[var(--ease-out-quint)] dark:bg-white/[0.12] dark:shadow-none"
        style={{ width: "calc((100% - 6px) / var(--n))", transform: "translateX(calc(100% * var(--i)))" }}
      />
      {options.map((o) => {
        const checked = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(o.id)}
            className={`relative z-10 rounded-[7px] px-3 font-medium transition-colors ${h} ${checked ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
