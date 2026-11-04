import { how } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <SectionHeading eyebrow={how.eyebrow} title={how.title} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {how.steps.map((s, i) => (
            <li key={s.n} className="bg-paper">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-7 sm:p-9">
                <span className="font-mono text-[12px] tabular-nums text-accent-ink">{s.n}</span>
                <h3 className="mt-8 text-[22px] md:mt-14 font-medium tracking-[-0.025em] text-ink">{s.title}</h3>
                <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
