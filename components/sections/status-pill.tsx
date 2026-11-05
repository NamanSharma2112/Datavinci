import type { Status } from "@/content/site";

const tone: Record<Status, string> = {
  Attention: "bg-bad-soft text-bad",
  Review: "bg-warn-soft text-warn",
  Healthy: "bg-good-soft text-good",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium ${tone[status]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
