"use client";

import type { StockStatus } from "@/lib/types/inventoryListing";
import { StockCheckIcon, StockWarningIcon } from "@/components/ui/icons";
import { useTranslation } from "@/lib/i18n/useTranslation";

/**
 * Stock-status badge. Color rule is explicit per Page 7's Figma spec:
 * in-stock = green, low = amber, out = slate/grey. Red is reserved for
 * errors only, never used for stock status. Uses the same dot/icon + tinted
 * pill treatment established on the landing page's example card (now moved
 * here, its real home) so both stay visually identical.
 */
const statusStyle: Record<StockStatus, { bg: string; color: string }> = {
  in_stock: { bg: "var(--color-stock-in-bg)", color: "var(--color-stock-in)" },
  low_stock: { bg: "var(--color-stock-low-bg)", color: "var(--color-stock-low)" },
  out_of_stock: { bg: "var(--color-border)", color: "var(--color-stock-out)" },
};

export function Badge({ status }: { status: StockStatus }) {
  const { t } = useTranslation();
  const label = { in_stock: t.stock.inStock, low_stock: t.stock.lowStock, out_of_stock: t.stock.outOfStock }[status];

  return (
    <span
      className="inline-flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: statusStyle[status].bg, color: statusStyle[status].color }}
    >
      {status === "in_stock" && <StockCheckIcon />}
      {status === "low_stock" && <StockWarningIcon />}
      {status === "out_of_stock" && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {label}
    </span>
  );
}
