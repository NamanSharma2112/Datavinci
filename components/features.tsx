import { features } from "@/content/site";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const f = features.items;

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <SectionHeading eyebrow={features.eyebrow} title={features.title} subtitle={features.subtitle} />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Card className="md:col-span-3" delay={0}>
            <Copy title={f.plan.title} body={f.plan.body} />
            <PlanVisual />
          </Card>

          <Card className="md:col-span-3" delay={0.06}>
            <Copy title={f.tools.title} body={f.tools.body} />
            <ToolsVisual nodes={f.tools.nodes} />
          </Card>

          <Card className="md:col-span-2" delay={0} dark>
            <Copy title={f.control.title} body={f.control.body} dark />
            <ApprovalVisual />
          </Card>

          <Card className="md:col-span-2" delay={0.06}>
            <Copy title={f.memory.title} body={f.memory.body} />
            <MemoryVisual />
          </Card>

          <Card className="md:col-span-2" delay={0.12}>
            <Copy title={f.team.title} body={f.team.body} />
            <TeamVisual />
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  children,
  className = "",
  delay = 0,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dark?: boolean;
}) {
  return (
    <Reveal
      delay={delay}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 ${
        dark
          ? "grain bg-night text-white ring-1 ring-night-line"
          : "bg-surface shadow-[var(--shadow-card)] ring-1 ring-ink/[0.06]"
      } ${className}`}
    >
      {children}
    </Reveal>
  );
}

function Copy({ title, body, dark = false }: { title: string; body: string; dark?: boolean }) {
  return (
    <div className="relative max-w-sm">
      <h3 className={`text-[19px] font-medium tracking-[-0.02em] ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-2 text-pretty text-[15px] leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>{body}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- visuals */

function PlanVisual() {
  const rows = [
    { t: "Read sign-ups from CRM", s: "done" },
    { t: "Filter teams over 200 people", s: "done" },
    { t: "Draft a hello for each", s: "edit" },
    { t: "Wait for approval", s: "todo" },
  ] as const;
  return (
    <div className="mt-10 rounded-2xl border border-line bg-paper/60 p-2">
      {rows.map((r, i) => (
        <div
          key={r.t}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] ${
            r.s === "edit" ? "bg-surface shadow-[var(--shadow-card)] ring-1 ring-accent/30" : ""
          }`}
        >
          <span className="w-5 font-mono text-[11px] tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
          <span className={`flex-1 truncate ${r.s === "todo" ? "text-faint" : "text-ink"}`}>
            {r.t}
            {r.s === "edit" ? <span className="caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-accent" /> : null}
          </span>
          {r.s === "edit" ? (
            <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[10.5px] text-accent-ink">editing</span>
          ) : r.s === "done" ? (
            <span className="font-mono text-[10.5px] text-faint">ready</span>
          ) : (
            <span className="font-mono text-[10.5px] text-faint">gate</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ToolsVisual({ nodes }: { nodes: readonly string[] }) {
  // Nodes on an ellipse around the mark; lines drawn in SVG underneath.
  const W = 440;
  const H = 210;
  const cx = W / 2;
  const cy = H / 2;
  const pts = nodes.map((label, i) => {
    const a = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
    return { label, x: cx + Math.cos(a) * 168, y: cy + Math.sin(a) * 78 };
  });
  return (
    <div className="relative mt-10 aspect-[44/21] w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        {pts.map((p) => (
          <line
            key={p.label}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="var(--color-line-2)"
            strokeDasharray="3 4"
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-surface shadow-[var(--shadow-float)] ring-1 ring-ink/[0.07]">
        <LogoMark className="size-8 text-ink" />
      </div>
      {pts.map((p) => (
        <span
          key={p.label}
          style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 shadow-[var(--shadow-card)] ring-1 ring-ink/[0.06] transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}

function ApprovalVisual() {
  return (
    <div className="relative mt-10 space-y-2">
      <div className="rounded-2xl border border-night-line bg-night-2 p-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">Approval needed</p>
        <p className="mt-2 text-[14px] text-white">Send 12 emails from your account?</p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex h-8 items-center rounded-full bg-white px-3.5 text-[13px] font-medium text-ink">Approve</span>
          <span className="inline-flex h-8 items-center rounded-full border border-white/15 px-3.5 text-[13px] text-white/80">Edit first</span>
        </div>
      </div>
      <div className="space-y-1.5 px-1 pt-2 font-mono text-[11px] text-white/35">
        <p>09:41:02 read crm.contacts · 86 rows</p>
        <p>09:41:04 draft email × 12</p>
        <p className="text-accent">09:41:05 paused · awaiting approval</p>
      </div>
    </div>
  );
}

function MemoryVisual() {
  const prefs = ["Warm, not salesy", "Sign off as Sam", "No emojis", "CC ops on deals", "Under 120 words"];
  return (
    <div className="mt-10 flex flex-wrap gap-2">
      {prefs.map((p, i) => (
        <span
          key={p}
          className={`rounded-full px-3 py-1.5 text-[13px] ring-1 ${
            i === 0 ? "bg-ink text-white ring-ink" : "bg-paper text-ink-2 ring-line"
          }`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function TeamVisual() {
  const people = [
    { i: "AK", c: "#e7e3da" },
    { i: "MR", c: "#d9e2dc" },
    { i: "JS", c: "#e6dccf" },
  ];
  return (
    <div className="mt-10 rounded-2xl border border-line bg-paper/60 p-4">
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {people.map((p) => (
            <span
              key={p.i}
              style={{ background: p.c }}
              className="grid size-8 place-items-center rounded-full text-[11px] font-medium text-ink-2 ring-2 ring-paper"
            >
              {p.i}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-faint">3 reviewing</span>
      </div>
      <p className="mt-4 text-[13.5px] text-ink">Weekly sign-up outreach</p>
      <p className="mt-0.5 text-[12.5px] text-muted">Shared run · reused 14 times</p>
    </div>
  );
}
