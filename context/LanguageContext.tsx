"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";
import type { PreferredLanguage } from "@/lib/types/user";

export interface LanguageContextValue {
  language: PreferredLanguage;
  setLanguage: (language: PreferredLanguage) => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "pharmalink_language";

function readStoredLanguage(): PreferredLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "am" ? "am" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<PreferredLanguage>(readStoredLanguage);

  const setLanguage = useCallback((next: PreferredLanguage) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "am" : "en");
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
