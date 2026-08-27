/**
 * English UI copy. Keep keys flat + namespaced by page/feature so both
 * dictionaries stay easy to diff. Medical content (drug info summaries)
 * is authored separately and pharmacist-reviewed — it does NOT live here.
 */
export const en = {
  common: {
    appName: "PharmaLink",
    languageToggle: "English",
    loading: "Loading...",
    errorGeneric: "Something went wrong. Please try again.",
    retry: "Retry",
    back: "Back",
  },
  auth: {
    loginTitle: "Log in",
    loginSubtitle: "Welcome back to PharmaLink",
    identifierLabel: "Phone or email",
    passwordLabel: "Password",
    loginButton: "Log in",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    tooManyAttempts: "Too many attempts. Please try again later.",
    invalidCredentials: "Incorrect phone/email or password.",
  },
  home: {
    greeting: "Hello",
    searchPlaceholder: "Search for a medicine",
    recentSearches: "Recent searches",
    commonMedicines: "Common medicines",
    nearYou: "Near you",
    setLocation: "Set location",
  },
  search: {
    resultsFor: "Results for",
    pharmaciesNear: "pharmacies near",
    sortDistance: "Distance",
    sortPrice: "Price: low to high",
    filterInStock: "In stock",
    filterOpenNow: "Open now",
    listView: "List",
    mapView: "Map",
    priceNotListed: "Price not listed",
    updated: "Updated",
    noResults: "No pharmacies found for this medicine nearby.",
  },
  stock: {
    inStock: "In stock",
    lowStock: "Low stock",
    outOfStock: "Out of stock",
  },
  drugInfo: {
    reviewedBy: "Reviewed by a licensed pharmacist",
    lastReviewed: "Last reviewed",
    usedFor: "What it's used for",
    sideEffects: "Possible side effects",
    warnings: "Warnings & interactions",
    disclaimer:
      "This is general information, not medical advice. Consult a pharmacist or doctor.",
    findPharmacies: "Find nearby pharmacies",
    setReminder: "Set a reminder",
    notAvailable: "Drug information for this medicine is not available yet.",
    prescriptionNeeded: "Prescription needed",
  },
};

/** Structural shape both dictionaries must match (string values, not literals). */
export type Dictionary = { [K in keyof typeof en]: { [K2 in keyof (typeof en)[K]]: string } };
