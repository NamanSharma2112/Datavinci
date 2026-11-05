import { agencies, finalCta, links, offer, type Status } from "@/content/site";
import { buildWorldMap } from "@/lib/world-map-data";
import { Arrow, Button } from "../ui/button";
import { Reveal } from "../ui/reveal";
import { Eyebrow } from "../ui/section-heading";
import { WorldMap, type MapMarker } from "../ui/world-map";

const STATUS_COLOR: Record<Status, string> = { Attention: "var(--bad)", Review: "var(--warn)", Healthy: "var(--good)" };

export function FinalCta() {
  // Runs on the server at build time: the browser only receives the finished dots.
  const map = buildWorldMap();
  const origin: MapMarker = { id: "origin", label: finalCta.origin.label, ...map.project(finalCta.origin.lat, finalCta.origin.lng), side: "right" };
  const markers: MapMarker[] = finalCta.markets.map((m) => {
    const client = agencies.clients.find((c) => c.name === m.client);
    return {
      id: m.client,
      label: `${m.client} · ${m.city}`,
      detail: client ? `${client.roas.toFixed(1)}×` : undefined,
      color: client ? STATUS_COLOR[client.status] : undefined,
      side: m.side,
      ...map.project(m.lat, m.lng),
    };
  });

  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden border-t border-line pt-24 sm:pt-32">
      <Reveal className="mx-auto max-w-[760px] px-4 text-center sm:px-6">
        <Eyebrow>{finalCta.eyebrow}</Eyebrow>
        <h2
          id="final-cta-title"
          className="font-display mx-auto mt-3 max-w-[22ch] text-balance text-[38px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-[58px]"
        >
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">{finalCta.body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={links.app} variant="accent" size="lg">
            {offer.long} <Arrow />
          </Button>
          <Button href={links.demo} variant="secondary" size="lg">
            See the live demo
          </Button>
        </div>
        <p className="mt-5 text-[13px] text-muted">{offer.reassurance.join(" · ")}</p>
      </Reveal>

      <div className="relative mx-auto mt-6 max-w-[1240px] px-2 sm:mt-2 sm:px-6">
        <WorldMap path={map.path} width={map.width} height={map.height} origin={origin} markers={markers} />
        <p className="pointer-events-none mt-1 text-center text-[11.5px] text-faint sm:absolute sm:bottom-[8%] sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 sm:whitespace-nowrap">
          Illustrative accounts · blended ROAS per client
        </p>
      </div>
    </section>
  );
}
