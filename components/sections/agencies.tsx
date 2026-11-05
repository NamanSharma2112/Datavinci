"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { agencies as a, links, type Status } from "@/content/site";
import { Arrow, Button, Check } from "../ui/button";
import { EASE, Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { StatusPill } from "./status-pill";
import { Sparkline } from "./sparkline";

type Filter = "All" | Status;
type SortKey = "status" | "roas" | "spend";
const RANK: Record<Status, number> = { Attention: 0, Review: 1, Healthy: 2 };

export function Agencies() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<SortKey>("status");

  const rows = useMemo(() => {
    const list = a.clients.filter((c) => filter === "All" || c.status === filter);
    return [...list].sort((x, y) =>
      sort === "status" ? RANK[x.status] - RANK[y.status] || x.roas - y.roas : sort === "roas" ? x.roas - y.roas : y.spend - x.spend,
    );
  }, [filter, sort]);

  const count = (s: Status) => a.clients.filter((c) => c.status === s).length;

  return (
    // Always dark: a deliberate change of pace in the middle of the page.
    <section id="agencies" data-theme="dark" className="scroll-mt-20 border-y border-line bg-bg py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:pt-6">
          <SectionHeading eyebrow={a.eyebrow} title={a.title} body={a.body} inverse />
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-3">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-white/75">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-violet-300">
                    <Check className="size-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={links.app} variant="inverse">
                Try the agency view <Arrow />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
              <p className="text-[13.5px] font-medium text-ink">Masterview</p>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
                {(["All", "Attention", "Review", "Healthy"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`press rounded-full px-2.5 py-1 text-[12px] font-medium ring-1 ${
                      filter === f ? "bg-ink text-bg ring-ink" : "text-muted ring-line hover:text-ink hover:ring-line-2"
                    }`}
                  >
                    {f}
                    {f !== "All" ? <span className="ml-1 opacity-60">{count(f)}</span> : null}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full text-left text-[13.5px]">
              <thead className="text-[11.5px] text-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium sm:px-5">Client</th>
                  <SortTh label="Status" k="status" sort={sort} setSort={setSort} />
                  <SortTh label="ROAS" k="roas" sort={sort} setSort={setSort} right />
                  <SortTh label="Spend" k="spend" sort={sort} setSort={setSort} right className="hidden sm:table-cell" />
                  <th className="hidden px-4 py-2.5 font-medium md:table-cell">Trend</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <motion.tr
                    key={c.name}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ layout: { duration: 0.4, ease: EASE }, opacity: { duration: 0.25 } }}
                    className="border-t border-line"
                  >
                    <td className="px-4 py-3.5 font-medium text-ink sm:px-5">{c.name}</td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={c.status} />
                    </td>
                    <td className="tnum px-4 py-3.5 text-right font-medium text-ink">{c.roas.toFixed(1)}×</td>
                    <td className="tnum hidden px-4 py-3.5 text-right text-muted sm:table-cell">${(c.spend / 1000).toFixed(1)}K</td>
                    <td className="hidden px-4 py-3.5 md:table-cell">
                      <Sparkline values={c.trend} status={c.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-line px-5 py-3 text-[12px] text-faint">Illustrative data · click a column to sort</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SortTh({
  label,
  k,
  sort,
  setSort,
  right = false,
  className = "",
}: {
  label: string;
  k: SortKey;
  sort: SortKey;
  setSort: (k: SortKey) => void;
  right?: boolean;
  className?: string;
}) {
  const on = sort === k;
  return (
    <th className={`px-4 py-2.5 font-medium ${right ? "text-right" : ""} ${className}`} aria-sort={on ? "ascending" : "none"}>
      <button type="button" onClick={() => setSort(k)} className={`inline-flex items-center gap-1 transition-colors ${on ? "text-ink" : "hover:text-ink"}`}>
        {label}
        <svg viewBox="0 0 10 10" className={`size-2.5 transition-opacity ${on ? "opacity-100" : "opacity-30"}`} aria-hidden="true">
          <path d="M2.5 4 5 6.5 7.5 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </th>
  );
}
