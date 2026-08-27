import type { ReactNode } from "react";

/**
 * Calm amber warning callout — used for drug-info warnings/interactions
 * (Page 9). Deliberately not red: medical warnings shouldn't read as errors.
 */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      {title && <p className="mb-1 text-sm font-semibold text-amber-900">{title}</p>}
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}
