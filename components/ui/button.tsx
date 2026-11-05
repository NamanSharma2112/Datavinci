type Variant = "primary" | "secondary" | "accent" | "inverse" | "ghost-inverse";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:opacity-90 shadow-[0_1px_2px_rgb(0_0_0/0.15)]",
  accent: "bg-accent text-white hover:bg-accent-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(91_33_182/0.3)]",
  secondary: "bg-surface text-ink ring-1 ring-line-2 hover:ring-faint",
  inverse: "bg-white text-[#0e0e10] hover:bg-white/90",
  "ghost-inverse": "text-white ring-1 ring-white/20 hover:ring-white/40 hover:bg-white/5",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const sizing =
    size === "sm" ? "h-9 px-4 text-[14px]" : size === "lg" ? "h-12 px-6 text-[15.5px]" : "h-11 px-5 text-[15px]";
  return (
    <a
      href={href}
      className={`press group inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] ${sizing} ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M3.5 8.4 6.5 11l6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
