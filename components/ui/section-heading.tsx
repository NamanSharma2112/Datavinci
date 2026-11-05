import { Reveal } from "./reveal";

export function Eyebrow({ children, inverse = false }: { children: React.ReactNode; inverse?: boolean }) {
  return (
    <p className={`text-[13px] font-semibold tracking-[-0.005em] ${inverse ? "text-violet-300" : "text-accent"}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  inverse = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-[40rem] ${className}`}>
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display mt-3 text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[46px] ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-4 text-pretty text-[17px] leading-relaxed ${inverse ? "text-white/60" : "text-muted"} ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
