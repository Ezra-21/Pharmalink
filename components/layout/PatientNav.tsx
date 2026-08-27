"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * App-wide patient nav: Search · Reminders · Profile.
 * Bottom bar on mobile, top bar on desktop (Page 6 layout spec).
 * Drug info intentionally is NOT a tab — reached via a medicine.
 */
const tabs = [
  { label: "Search", href: "/home" },
  { label: "Reminders", href: "/reminders" },
  { label: "Profile", href: "/profile" },
];

export function PatientNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-zinc-200 bg-white sm:static sm:border-t-0 sm:border-b">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              isActive ? "text-blue-600" : "text-zinc-500"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
