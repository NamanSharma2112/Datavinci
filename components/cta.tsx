import { brand, cta } from "@/content/site";
import { Arrow, Button } from "./button";
import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="px-4 pb-6 sm:px-6">
      <Reveal className="grain relative mx-auto max-w-[1160px] overflow-hidden rounded-[32px] bg-night px-6 py-20 text-center sm:px-12 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 mx-auto h-80 max-w-2xl rounded-full bg-accent/25 blur-[120px]"
        />
        <h2 className="relative mx-auto max-w-2xl text-balance text-[40px] font-medium leading-[1.03] tracking-[-0.045em] text-white sm:text-[60px]">
          {cta.title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-white/60">{cta.body}</p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <Button href={brand.appUrl} variant="light" className="group">
            {cta.primary}
            <Arrow />
          </Button>
          <Button href={brand.demoUrl} variant="ghost-dark">
            {cta.secondary}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
