import { finalCta, links, offer } from "@/content/site";
import { Arrow, Button } from "../ui/button";
import { Reveal } from "../ui/reveal";

export function FinalCta() {
  return (
    <section className="px-3 pb-3 sm:px-6 sm:pb-6">
      <Reveal className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#0e0e10] px-6 py-20 text-center sm:rounded-[36px] sm:px-12 sm:py-28">
        <div aria-hidden="true" className="absolute inset-x-0 -top-48 mx-auto h-96 max-w-3xl rounded-full bg-[#7c3aed]/35 blur-[120px]" />
        <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(60%_60%_at_50%_30%,#000,transparent)]" />
        <h2 className="font-display relative mx-auto max-w-[18ch] text-balance text-[38px] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-[58px]">
          {finalCta.title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-white/60">{finalCta.body}</p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <Button href={links.app} variant="inverse" size="lg">
            {offer.long} <Arrow />
          </Button>
          <Button href={links.demo} variant="ghost-inverse" size="lg">
            See the live demo
          </Button>
        </div>
        <p className="relative mt-6 text-[13px] text-white/45">{offer.reassurance.join(" · ")}</p>
      </Reveal>
    </section>
  );
}
