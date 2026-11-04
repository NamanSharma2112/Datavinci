import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost-dark" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] hover:bg-ink-2",
  secondary: "bg-surface text-ink border border-line-2 hover:border-faint shadow-[0_1px_2px_rgb(18_18_17/0.05)]",
  "ghost-dark": "text-white border border-white/15 hover:border-white/35 hover:bg-white/5",
  light: "bg-white text-ink hover:bg-white/90",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}) {
  const sizing = size === "sm" ? "h-9 px-3.5 text-[14px]" : "h-11 px-5 text-[15px]";
  return (
    <Link
      href={href}
      className={`press inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] ${sizing} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
