/** Wordmark for the concept. A rising line ends in a dot: one number, going up. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="var(--ink)" />
        <path d="M7 18.5 11.5 14l3.5 3 6-7" fill="none" stroke="var(--bg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="10" r="2.2" fill="var(--accent)" />
      </svg>
      <span className="font-display text-[19px] font-bold tracking-[-0.03em] text-ink">Grippi</span>
    </span>
  );
}
