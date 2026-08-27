import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { PatientNav } from "@/components/layout/PatientNav";

/**
 * Shared shell for all patient-role routes: top/bottom nav + language pill.
 * Locked visually once Page 6 (Patient Home) is implemented.
 */
export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16 sm:pb-0">
      <Header>PharmaLink</Header>
      <PatientNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
