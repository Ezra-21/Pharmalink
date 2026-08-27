"use client";

import type { ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  /** Compact variant used pre-filled on Search Results (Page 7); the
   * default/larger variant is used as the hero search on Patient Home (Page 6). */
  compact?: boolean;
}

/**
 * Shared between Patient Home's hero search and Search Results' compact,
 * pre-filled/editable search bar, per the architecture plan.
 */
export function SearchBar({ value, placeholder, onChange, onSubmit, compact = false }: SearchBarProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-full" : "w-full max-w-md"}>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? "Search for a medicine"}
        className={`w-full rounded-full border border-zinc-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          compact ? "px-4 py-2 text-sm" : "px-5 py-3.5 text-base"
        }`}
      />
    </form>
  );
}
