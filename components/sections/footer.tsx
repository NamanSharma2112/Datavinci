import { concept, footer } from "@/content/site";
import { Logo } from "../ui/logo";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] text-muted">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <p className="text-[13px] font-medium text-ink">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-[14px] text-muted transition-colors hover:text-ink">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Grippi</p>
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
