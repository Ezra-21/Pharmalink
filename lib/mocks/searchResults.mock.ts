import type { PharmacyListingResult } from "@/lib/types/inventoryListing";

/**
 * Shaped exactly like the real Inventory Listing ⨝ Pharmacy join (PRD §8) that
 * the Go backend will eventually return for a medicine search. Deliberately
 * uses a different data instance than the Figma mock (Paracetamol/Bole Medico
 * table) to avoid the UI being built around one hardcoded example.
 */
export function getMockSearchResults(medicineId: string): PharmacyListingResult[] {
  return [
    {
      id: "listing_1",
      pharmacyId: "pharm_1",
      medicineId,
      stockStatus: "in_stock",
      price: 45,
      currency: "ETB",
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedBy: "staff_1",
      pharmacy: { id: "pharm_1", name: "Bole Medico Pharmacy", distanceKm: 1.2, isOpenNow: true },
    },
    {
      id: "listing_2",
      pharmacyId: "pharm_2",
      medicineId,
      stockStatus: "in_stock",
      price: 42,
      currency: "ETB",
      updatedAt: new Date().toISOString(),
      updatedBy: "staff_2",
      pharmacy: { id: "pharm_2", name: "Sunrise Pharmacy", distanceKm: 1.8, isOpenNow: true },
    },
    {
      id: "listing_3",
      pharmacyId: "pharm_3",
      medicineId,
      stockStatus: "low_stock",
      price: null,
      currency: "ETB",
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedBy: "staff_3",
      pharmacy: { id: "pharm_3", name: "Kenema Pharmacy", distanceKm: 2.3, isOpenNow: true },
    },
  ];
}
