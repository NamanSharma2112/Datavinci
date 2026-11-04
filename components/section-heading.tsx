import { Reveal } from "./reveal";

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
        dark ? "text-white/55" : "text-muted"
      }`}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-balance text-[32px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[44px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 max-w-xl text-pretty text-[17px] leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
