import { platforms } from "@/content/site";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { PlatformIcon } from "../ui/platform-icon";

export function Platforms() {
  return (
    <section aria-label="Supported platforms" className="py-16 sm:py-20">
      <p className="text-center text-[13px] text-muted">Connects to every platform you already run — in five minutes, no API keys</p>
      <InfiniteMovingCards className="mx-auto mt-6 max-w-[1100px]" speed={45}>
        {platforms.map((p) => (
          <li
            key={p}
            className="flex h-11 items-center gap-2.5 rounded-full bg-surface px-4 text-[14px] font-medium text-ink-2 ring-1 ring-line"
          >
            <PlatformIcon name={p} className="size-4 text-ink" />
            {p}
          </li>
        ))}
      </InfiniteMovingCards>
    </section>
  );
}
