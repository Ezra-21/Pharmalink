import type { ReactNode } from "react";
import { LanguagePill } from "@/components/ui/LanguagePill";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Shared header for every (patient) route. Keeps the theme toggle and
 * language pill in one place at the layout level so they're available on
 * every current and future patient page without each page adding them.
 */
export function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <div className="text-sm font-semibold text-[var(--color-text-primary)]">{children}</div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguagePill />
      </div>
    </header>
  );
}
