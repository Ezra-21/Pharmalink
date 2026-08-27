export type ViewMode = "list" | "map";

export function ListMapToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-zinc-300 p-0.5 text-sm">
      {(["list", "map"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full px-3 py-1 capitalize ${
            mode === option ? "bg-blue-600 text-white" : "text-zinc-600"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
