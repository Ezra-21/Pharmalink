import Image from "next/image";
import { PlusIcon } from "@/components/ui/icons";

/**
 * Desktop-only left brand panel for the registration screens (Page 3 node
 * 6:121; reused as-is on Page 4). A full-bleed photo with a teal
 * mix-blend overlay and a bottom gradient for text legibility, matching
 * Login's own "optional two-pane" recommendation — now made concrete here.
 * Hidden below `lg`, where the form pane takes the full width instead.
 */
export function AuthBrandPanel({
  imageSrc,
  appName,
  tagline,
}: {
  imageSrc: string;
  appName: string;
  tagline: string;
}) {
  return (
    <div className="relative hidden h-full w-full overflow-hidden lg:block">
      <Image src={imageSrc} alt="" fill sizes="45vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-[rgba(15,83,71,0.2)] mix-blend-multiply" aria-hidden="true" />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-8">
        <div className="flex max-w-[448px] flex-col gap-4 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/20 backdrop-blur-[2px]">
              <PlusIcon />
            </span>
            <span className="text-2xl font-bold tracking-[-0.6px] text-white">{appName}</span>
          </div>
          <p className="text-lg leading-7 text-white/90">{tagline}</p>
        </div>
      </div>
    </div>
  );
}
