"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { InfoCircleIcon, LocationPinIcon, SearchIcon } from "@/components/ui/icons";

/**
 * Hero section — extracted from Figma node 17:975 ("Main", Hero Section).
 * Fixed desktop pixel widths from the Figma export (w-[512px], w-[448px])
 * are adapted to responsive Tailwind (max-w + flex-col), since Stitch only
 * generates a desktop frame, per the design-to-code skill's "adapt, don't
 * paste verbatim" rule.
 *
 * The Figma frame also included a static "Example Search Result" card next
 * to the hero text. That's intentionally NOT rendered here — real result
 * cards only appear on /search once a patient actually searches (see
 * components/search/SearchResultsView.tsx), using this same demo data
 * properly instead of it being a permanent landing-page fixture.
 *
 * The form is a real GET form (name="q") so search works with JavaScript
 * disabled; onSubmit progressively enhances it with client-side navigation.
 */
export function LandingHero() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showEmptyHint, setShowEmptyHint] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setShowEmptyHint(true);
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function runChipSearch(medicine: string) {
    router.push(`/search?q=${encodeURIComponent(medicine)}`);
  }

  const chips = [t.landing.heroChip1, t.landing.heroChip2, t.landing.heroChip3];

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-6 px-[24px] pt-16 pb-6 text-center lg:pt-24">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1">
          <LocationPinIcon className="text-[var(--color-brand)]" />
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{t.landing.heroEyebrow}</span>
        </div>

        <h1 className="w-full text-[26px] leading-8 font-bold tracking-[-0.65px] text-[var(--color-text-primary)] sm:text-[32px] sm:leading-10">
          {t.landing.heroTitle}
        </h1>

        <p className="max-w-[512px] text-base leading-6 text-[var(--color-text-secondary)]">{t.landing.heroSubtitle}</p>

        <form onSubmit={handleSubmit} action="/search" method="GET" className="flex w-full max-w-[448px] flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <label htmlFor="hero-search" className="sr-only">
              {t.landing.heroSearchLabel}
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left">
              <SearchIcon className="shrink-0 text-[var(--color-text-secondary)]" />
              <input
                id="hero-search"
                type="search"
                name="q"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (showEmptyHint) setShowEmptyHint(false);
                }}
                placeholder={t.landing.heroSearchPlaceholder}
                className="w-full bg-transparent text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-brand)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]/40"
            >
              {t.landing.heroSearchButton}
            </button>
          </div>
          {showEmptyHint && (
            <p className="text-sm text-[var(--color-error)]" role="alert">
              {t.landing.heroEmptyHint}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[13px] text-[var(--color-text-secondary)]">{t.landing.heroTryLabel}</span>
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => runChipSearch(chip)}
                className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[13px] text-[var(--color-text-primary)] ring-1 ring-inset ring-[var(--color-border)] transition-colors hover:bg-[var(--color-canvas)]"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <InfoCircleIcon className="text-[var(--color-text-secondary)]" />
            <span className="text-[13px] text-[var(--color-text-secondary)]">{t.landing.heroNoAccountNeeded}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
