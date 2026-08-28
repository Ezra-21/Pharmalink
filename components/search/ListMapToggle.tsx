"use client";

import { ListViewIcon, MapViewIcon } from "@/components/ui/icons";
import { useTranslation } from "@/lib/i18n/useTranslation";

export type ViewMode = "list" | "map";

/**
 * Segmented List/Map control — Page 7 Figma node 6:519. Map is a real,
 * honest "not built yet" placeholder rather than a fake/broken map (no map
 * library is integrated); List stays the default and fallback per the PRD.
 */
export function ListMapToggle({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  const { t } = useTranslation();

  return (
    <div
      role="tablist"
      className="inline-flex items-center gap-1 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[5px]"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "list"}
        onClick={() => onChange("list")}
        className={`inline-flex items-center gap-1 rounded-[4px] px-3 py-1 text-sm font-medium transition-colors ${
          mode === "list"
            ? "bg-[var(--color-canvas)] text-[var(--color-text-primary)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            : "text-[var(--color-text-secondary)]"
        }`}
      >
        <ListViewIcon />
        {t.search.listView}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "map"}
        onClick={() => onChange("map")}
        className={`inline-flex items-center gap-1 rounded-[4px] px-3 py-1 text-sm font-medium transition-colors ${
          mode === "map"
            ? "bg-[var(--color-canvas)] text-[var(--color-text-primary)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            : "text-[var(--color-text-secondary)]"
        }`}
      >
        <MapViewIcon />
        {t.search.mapView}
      </button>
    </div>
  );
}
