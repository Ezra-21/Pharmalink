"use client";

import type { PharmacyListingResult } from "@/lib/types/inventoryListing";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DistanceIcon } from "@/components/ui/icons";
import { useTranslation } from "@/lib/i18n/useTranslation";

/**
 * Relative-time suffixes ("h ago" / "d ago") stay in English for now — the
 * lightweight dictionary in lib/i18n has no string-interpolation support
 * yet, so a fully localized "N hours ago" would need that feature added
 * first rather than being faked here.
 */
function formatUpdatedAt(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/**
 * Locked, reused listing card (Page 7): pharmacy name, stock badge, distance,
 * open/closed, price (or "Price not listed"), and last-updated freshness.
 */
export function PharmacyResultCard({ listing }: { listing: PharmacyListingResult }) {
  const { t } = useTranslation();

  return (
    <Card className="flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-[var(--color-text-primary)]">{listing.pharmacy.name}</p>
          <Badge status={listing.stockStatus} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-[var(--color-text-secondary)]">
          {listing.pharmacy.distanceKm != null ? (
            <span className="inline-flex items-center gap-1">
              <DistanceIcon />
              {listing.pharmacy.distanceKm} km away
            </span>
          ) : (
            <span>{t.search.distanceUnknown}</span>
          )}
          <span aria-hidden="true">·</span>
          <span>{listing.pharmacy.isOpenNow ? t.search.openNow : t.search.closed}</span>
          <span aria-hidden="true">·</span>
          <span>
            {t.search.updated} {formatUpdatedAt(listing.updatedAt)}
          </span>
        </div>
      </div>
      <p className="shrink-0 text-base font-semibold text-[var(--color-text-primary)]">
        {listing.price != null ? `${listing.price} ${listing.currency}` : t.search.priceNotListed}
      </p>
    </Card>
  );
}
