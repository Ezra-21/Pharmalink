import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function RoleSelectCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </Card>
    </Link>
  );
}
