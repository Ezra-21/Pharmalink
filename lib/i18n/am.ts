import type { Dictionary } from "@/lib/i18n/en";

/**
 * Amharic UI copy — placeholder translations for scaffolding only.
 * Per PRD §9.2 / Page 9, real Amharic content (especially medical text)
 * must be reviewed by a native speaker / pharmacist, not machine-translated.
 * TODO: replace with reviewed Amharic strings before shipping.
 */
export const am: Dictionary = {
  common: {
    appName: "ፋርማሊንክ",
    languageToggle: "አማርኛ",
    loading: "በመጫን ላይ...",
    errorGeneric: "የሆነ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
    retry: "እንደገና ሞክር",
    back: "ተመለስ",
  },
  auth: {
    loginTitle: "ግባ",
    loginSubtitle: "ወደ ፋርማሊንክ እንኳን ደህና መጡ",
    identifierLabel: "ስልክ ወይም ኢሜይል",
    passwordLabel: "የይለፍ ቃል",
    loginButton: "ግባ",
    forgotPassword: "የይለፍ ቃል ረሱ?",
    noAccount: "አካውንት የለዎትም?",
    signUp: "ይመዝገቡ",
    tooManyAttempts: "በጣም ብዙ ሙከራዎች። እባክዎ ቆይተው ይሞክሩ።",
    invalidCredentials: "የተሳሳተ ስልክ/ኢሜይል ወይም የይለፍ ቃል።",
  },
  home: {
    greeting: "ሰላም",
    searchPlaceholder: "መድሃኒት ይፈልጉ",
    recentSearches: "የቅርብ ጊዜ ፍለጋዎች",
    commonMedicines: "የተለመዱ መድሃኒቶች",
    nearYou: "በአቅራቢያዎ",
    setLocation: "አካባቢ ይምረጡ",
  },
  search: {
    resultsFor: "ውጤቶች ለ",
    pharmaciesNear: "ፋርማሲዎች በአቅራቢያ",
    sortDistance: "ርቀት",
    sortPrice: "ዋጋ: ከዝቅተኛ ወደ ከፍተኛ",
    filterInStock: "በስቶክ ያለ",
    filterOpenNow: "አሁን ክፍት",
    listView: "ዝርዝር",
    mapView: "ካርታ",
    priceNotListed: "ዋጋ አልተመዘገበም",
    updated: "የተዘመነው",
    noResults: "በአቅራቢያ ለዚህ መድሃኒት ምንም ፋርማሲ አልተገኘም።",
  },
  stock: {
    inStock: "በስቶክ አለ",
    lowStock: "አነስተኛ ስቶክ",
    outOfStock: "አልቋል",
  },
  drugInfo: {
    reviewedBy: "በፈቃድ ባለው ፋርማሲስት የተገመገመ",
    lastReviewed: "መጨረሻ የተገመገመው",
    usedFor: "ለምን ጥቅም ላይ ይውላል",
    sideEffects: "ሊኖሩ የሚችሉ የጎንዮሽ ጉዳቶች",
    warnings: "ማስጠንቀቂያዎች እና መስተጋብሮች",
    disclaimer: "ይህ አጠቃላይ መረጃ ነው፣ የህክምና ምክር አይደለም። ፋርማሲስት ወይም ሐኪም ያማክሩ።",
    findPharmacies: "በአቅራቢያ ያሉ ፋርማሲዎችን ፈልግ",
    setReminder: "አስታዋሽ ያዘጋጁ",
    notAvailable: "ለዚህ መድሃኒት መረጃ እስካሁን አልተዘጋጀም።",
    prescriptionNeeded: "የሐኪም ማዘዣ ያስፈልጋል",
  },
};
