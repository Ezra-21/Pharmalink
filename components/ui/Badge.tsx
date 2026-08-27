import type { StockStatus } from "@/lib/types/inventoryListing";

/**
 * Stock-status badge. Color rule is explicit per Page 7's Figma spec:
 * in-stock = green, low = amber, out = slate/grey. Red is reserved for
 * errors only, never used for stock status.
 */
const statusClasses: Record<StockStatus, string> = {
  in_stock: "bg-green-100 text-green-800",
  low_stock: "bg-amber-100 text-amber-800",
  out_of_stock: "bg-slate-100 text-slate-600",
};

const statusLabels: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
};

export function Badge({ status }: { status: StockStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
