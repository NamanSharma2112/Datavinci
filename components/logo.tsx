export function LogoMark({ className = "" }: { className?: string }) {
  // Two offset bars closing on a dot: a "grip".
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor" />
      <path
        d="M8 8.5h5.5a3.5 3.5 0 0 1 0 7H8"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="9.25" cy="12" r="1.35" fill="var(--color-accent)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="size-6" />
      <span className="text-[17px] font-semibold tracking-[-0.03em]">grippi</span>
    </span>
  );
}
