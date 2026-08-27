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
  // NOTE: all strings below are draft machine-assisted translations per
  // PRD §9.2 — not yet reviewed by a native Amharic speaker. TODO before ship.
  auth: {
    title: "እንኳን ደህና ተመለሱ",
    subtitle: "የሚፈልጉትን መድኃኒት በፍጥነት፣ በአቅራቢያዎ ያግኙ።",
    identifierLabel: "ኢሜይል አድራሻ",
    emailPlaceholder: "name@email.com",
    passwordLabel: "የይለፍ ቃል",
    passwordPlaceholder: "የይለፍ ቃልዎን ያስገቡ",
    showPassword: "አሳይ",
    hidePassword: "ደብቅ",
    loginButton: "ግባ",
    loggingIn: "በመግባት ላይ…",
    forgotPassword: "የይለፍ ቃል ረሱ?",
    noAccount: "አካውንት የለዎትም?",
    signUp: "ይመዝገቡ",
    trustLine: "መረጃዎ ሚስጥራዊ እና የተጠበቀ ነው።",
    emptyEmail: "ኢሜይል ያስፈልጋል",
    invalidEmail: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።",
    emptyPassword: "እባክዎ የይለፍ ቃልዎን ያስገቡ።",
    tooManyAttempts: "በጣም ብዙ ሙከራዎች። እባክዎ ቆይተው ይሞክሩ።",
    invalidCredentials: "የተሳሳተ ኢሜይል ወይም የይለፍ ቃል።",
    offlineBanner: "ከመስመር ውጭ ነዎት። ለመግባት ኢንተርኔት ያገናኙ።",
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
