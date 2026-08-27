import { PublicHeader } from "@/components/layout/PublicHeader";
import { SearchResultsView } from "@/components/search/SearchResultsView";

/**
 * Page 7 — Search Results. Public (per proxy.ts — anonymous search is a
 * hard requirement, prd.md §7.1), so it lives outside the (patient) route
 * group and uses the same public header as the landing page rather than
 * the logged-in patient app shell (Search/Reminders/Profile bottom nav),
 * which only makes sense once there's an actual account.
 *
 * Reads the `q` param set by the landing page hero (and, later, Patient
 * Home's search bar), then hands it to a client component that resolves
 * it against the mock-backed medicine/listing lookups in
 * lib/api/medicines.ts and renders a normal, page-scrollable list of
 * pharmacy result cards.
 *
 * Map view is intentionally not implemented yet — deferred until the
 * design for it is provided.
 */
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <PublicHeader />
      <main className="flex-1">
        <SearchResultsView query={q ?? ""} />
      </main>
    </div>
  );
}
