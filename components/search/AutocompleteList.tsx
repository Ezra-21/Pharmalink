import type { Medicine } from "@/lib/types/medicine";

export function AutocompleteList({
  suggestions,
  onSelect,
}: {
  suggestions: Medicine[];
  onSelect: (medicine: Medicine) => void;
}) {
  if (suggestions.length === 0) return null;

  return (
    <ul className="mt-1 divide-y divide-zinc-100 rounded-lg border border-zinc-200 bg-white shadow-sm">
      {suggestions.map((medicine) => (
        <li key={medicine.id}>
          <button
            onClick={() => onSelect(medicine)}
            className="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-zinc-50"
          >
            <span className="text-sm font-medium text-zinc-900">{medicine.genericName}</span>
            {medicine.brandNames.length > 0 && (
              <span className="text-xs text-zinc-500">{medicine.brandNames.join(", ")}</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
