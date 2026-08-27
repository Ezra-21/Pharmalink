import type { PharmacyListingResult } from "@/lib/types/inventoryListing";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
  return (
    <Card className="flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-zinc-900">{listing.pharmacy.name}</p>
          <Badge status={listing.stockStatus} />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          {listing.pharmacy.distanceKm != null ? `${listing.pharmacy.distanceKm} km` : "Distance unknown"}
          {" · "}
          {listing.pharmacy.isOpenNow ? "Open now" : "Closed"}
          {" · Updated "}
          {formatUpdatedAt(listing.updatedAt)}
        </p>
      </div>
      <p className="text-sm font-semibold text-zinc-900">
        {listing.price != null ? `ETB ${listing.price}` : "Price not listed"}
      </p>
    </Card>
  );
}
