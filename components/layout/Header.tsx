import type { ReactNode } from "react";
import { LanguagePill } from "@/components/ui/LanguagePill";

export function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
      <div className="text-sm font-semibold text-zinc-900">{children}</div>
      <LanguagePill />
    </header>
  );
}
