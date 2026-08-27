"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Medicine } from "@/lib/types/medicine";
import type { PharmacyListingResult } from "@/lib/types/inventoryListing";
import { getMedicineListings, searchMedicines } from "@/lib/api/medicines";
import { PharmacyResultCard } from "@/components/search/PharmacyResultCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowLeftIcon, SearchIcon } from "@/components/ui/icons";
import { useTranslation } from "@/lib/i18n/useTranslation";

type ViewStatus = "idle" | "loading" | "success" | "empty" | "error";

/**
 * Resolves a free-text query (from the URL's `q` param — typed on the
 * landing page hero or, later, Patient Home) into an actual medicine match
 * and its pharmacy listings, using the existing lib/api/medicines.ts
 * functions (already mock-backed via USE_MOCKS, ready to swap to the real
 * Go endpoints later with no change here).
 *
 * This is the real destination for the demo data that used to sit as a
 * static card on the landing page — it now only appears here, after an
 * actual search, as a normal scrollable page list rather than a fixture.
 */
export function SearchResultsView({ query }: { query: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [status, setStatus] = useState<ViewStatus>("idle");
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [results, setResults] = useState<PharmacyListingResult[]>([]);
  const [inputValue, setInputValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);

  // Keep the editable field in sync if the URL's query changes from outside
  // this component (e.g. navigating here again with a new chip). Adjusted
  // during render rather than in an effect, per React's guidance for
  // resetting state when a prop changes.
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setInputValue(query);
  }

  function handleRefineSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  const runSearch = useCallback(async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      setStatus("idle");
      setMedicine(null);
      setResults([]);
      return;
    }
    setStatus("loading");
    try {
      const matches = await searchMedicines(trimmed);
      const match = matches[0] ?? null;
      setMedicine(match);
      if (!match) {
        setResults([]);
        setStatus("empty");
        return;
      }
      const listings = await getMedicineListings(match.id);
      setResults(listings);
      setStatus(listings.length === 0 ? "empty" : "success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // Intentional fetch-on-query-change, same pattern as AuthContext's
    // fetch-on-mount refresh(): the effect's job is running the async
    // lookup, which itself calls setState once results resolve.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runSearch(query);
  }, [query, runSearch]);

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      >
        <ArrowLeftIcon />
        {t.common.back}
      </Link>

      <form onSubmit={handleRefineSubmit} action="/search" method="GET" className="flex items-center gap-2">
        <label htmlFor="refine-search" className="sr-only">
          {t.landing.heroSearchLabel}
        </label>
        <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
          <SearchIcon className="shrink-0 text-[var(--color-text-secondary)]" />
          <input
            id="refine-search"
            type="search"
            name="q"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.landing.heroSearchPlaceholder}
            className="w-full bg-transparent text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-[var(--radius-button)] bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]/40"
        >
          {t.landing.heroSearchButton}
        </button>
      </form>

      {status !== "idle" && (
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
            {t.search.resultsFor} &ldquo;{query}&rdquo;
          </h1>
          {status === "success" && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {results.length} {t.search.pharmaciesFound}
              {medicine ? ` — ${medicine.genericName}` : ""}
            </p>
          )}
        </div>
      )}

      {status === "idle" && <EmptyState title={t.search.searchPrompt} />}

      {status === "loading" && (
        <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {status === "error" && (
        <EmptyState
          title={t.common.errorGeneric}
          action={
            <button
              type="button"
              onClick={() => runSearch(query)}
              className="rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-canvas)]"
            >
              {t.common.retry}
            </button>
          }
        />
      )}

      {status === "empty" && <EmptyState title={t.search.noResults} />}

      {status === "success" && (
        <div className="flex flex-col gap-3">
          {results.map((listing) => (
            <PharmacyResultCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
