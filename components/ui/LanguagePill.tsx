"use client";

import { useLanguage } from "@/hooks/useLanguage";

export function LanguagePill() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
    >
      {language === "en" ? "EN / አማ" : "አማ / EN"}
    </button>
  );
}
