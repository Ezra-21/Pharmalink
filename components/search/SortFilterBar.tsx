export type SortOption = "distance" | "price";

export function SortFilterBar({
  sort,
  onSortChange,
  inStockOnly,
  onInStockOnlyChange,
  openNowOnly,
  onOpenNowOnlyChange,
}: {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  openNowOnly: boolean;
  onOpenNowOnlyChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm"
      >
        <option value="distance">Distance</option>
        <option value="price">Price: low to high</option>
      </select>
      <button
        onClick={() => onInStockOnlyChange(!inStockOnly)}
        className={`rounded-full border px-3 py-1.5 text-sm ${
          inStockOnly ? "border-blue-500 bg-blue-50 text-blue-700" : "border-zinc-300 text-zinc-600"
        }`}
      >
        In stock
      </button>
      <button
        onClick={() => onOpenNowOnlyChange(!openNowOnly)}
        className={`rounded-full border px-3 py-1.5 text-sm ${
          openNowOnly ? "border-blue-500 bg-blue-50 text-blue-700" : "border-zinc-300 text-zinc-600"
        }`}
      >
        Open now
      </button>
    </div>
  );
}
