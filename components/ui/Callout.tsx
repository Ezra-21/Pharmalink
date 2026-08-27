import type { ReactNode } from "react";

type CalloutVariant = "warning" | "error";

const variantClasses: Record<CalloutVariant, { border: string; bg: string; title: string; text: string }> = {
  // Calm amber warning — used for drug-info warnings/interactions (Page 9).
  // Deliberately not red: medical warnings shouldn't read as errors.
  warning: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    title: "text-amber-900",
    text: "text-amber-800",
  },
  // Form/auth errors (Page 1 Login) — calm styling using the error tokens,
  // not an alarming saturated red.
  error: {
    border: "border-[var(--color-error)]/30",
    bg: "bg-[var(--color-error-bg)]",
    title: "text-[var(--color-error)]",
    text: "text-[var(--color-error)]",
  },
};

export function Callout({
  title,
  children,
  variant = "warning",
}: {
  title?: string;
  children: ReactNode;
  variant?: CalloutVariant;
}) {
  const classes = variantClasses[variant];
  return (
    <div role={variant === "error" ? "alert" : undefined} className={`rounded-lg border p-4 ${classes.border} ${classes.bg}`}>
      {title && <p className={`mb-1 text-sm font-semibold ${classes.title}`}>{title}</p>}
      <div className={`text-sm ${classes.text}`}>{children}</div>
    </div>
  );
}
