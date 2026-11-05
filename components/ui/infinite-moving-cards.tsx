/**
 * Adapted from Aceternity UI "Infinite Moving Cards" (ui.aceternity.com).
 * Changes: renders the duplicate set in React (aria-hidden) instead of cloning
 * DOM nodes, uses the site's tokens, and stops under prefers-reduced-motion.
 */
export function InfiniteMovingCards({
  children,
  speed = 40,
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number; // seconds per loop
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`marquee-wrap relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] ${className}`}
    >
      <div
        className="marquee flex w-max"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <ul className="flex shrink-0 items-center gap-3 pr-3">{children}</ul>
        <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
          {children}
        </ul>
      </div>
    </div>
  );
}
