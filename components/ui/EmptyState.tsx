import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-8 text-center">
      <p className="text-sm font-medium text-zinc-900">{title}</p>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
      {action}
    </div>
  );
}
