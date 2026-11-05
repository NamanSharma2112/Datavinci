import { links, offer, pricing as p } from "@/content/site";
import { Button, Check } from "../ui/button";
import { BeamCta } from "../ui/beam-cta";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line bg-bg-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} body={p.body} center />
        <div className="mx-auto mt-14 grid max-w-[880px] gap-4 md:grid-cols-2">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div className={`flex h-full flex-col rounded-[24px] bg-surface p-7 sm:p-8 ${plan.featured ? "shadow-[var(--shadow-float)] ring-2 ring-accent" : "ring-1 ring-line"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">{plan.name}</p>
                  {plan.featured ? (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[12px] font-medium text-accent-ink">Most popular</span>
                  ) : null}
                </div>
                <p className="mt-1 text-[14px] text-muted">{plan.for}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display tnum text-[52px] font-semibold leading-none tracking-[-0.05em] text-ink">${plan.price}</span>
                  <span className="text-[14px] text-muted">/ month · {plan.unit}</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
                      <Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-accent" : "text-good"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {plan.featured ? (
                    <BeamCta href={links.app}>{offer.long}</BeamCta>
                  ) : (
                    <Button href={links.app} variant="secondary" size="lg" className="w-full">
                      {offer.long}
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[13.5px] text-muted">{offer.reassurance.join(" · ")} · Cancel anytime</p>
      </div>
    </section>
  );
}
