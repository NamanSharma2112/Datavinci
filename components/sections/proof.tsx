import { proof } from "@/content/site";
import { Reveal } from "../ui/reveal";

export function Proof() {
  return (
    <section aria-label="Results" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line lg:grid-cols-4">
          {proof.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="bg-bg p-6 sm:p-8">
              <p className="font-display tnum text-[40px] font-semibold leading-none tracking-[-0.045em] text-ink sm:text-[52px]">{s.value}</p>
              <p className="mt-3 max-w-[16rem] text-[14px] leading-snug text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {proof.quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col justify-between rounded-[24px] bg-bg-2 p-7 ring-1 ring-line">
                <blockquote className="text-pretty text-[16.5px] leading-[1.55] tracking-[-0.01em] text-ink">“{q.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-surface text-[12px] font-semibold text-ink-2 ring-1 ring-line">
                    {q.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-ink">{q.name}</span>
                    <span className="block text-[13px] text-muted">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
