import { brand, concept, footer } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              Hand off the work. Keep the say.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[14px] text-ink-2 transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}</p>
          <p>
            {concept.note} Designed &amp; built by{" "}
            <a href={concept.authorUrl} className="text-ink-2 underline decoration-line-2 underline-offset-4 hover:decoration-ink">
              {concept.author}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
