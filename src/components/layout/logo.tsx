import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import icon from "@/app/apple-icon.png";

/**
 * The knot icon beside the full name. Both the navbar and the footer use it, so
 * the brand only has to change in one place.
 *
 * `shortenOnTight` drops the surname between `lg` and `xl`, where the desktop
 * navigation needs the room, and shows it everywhere else.
 */
export function Logo({
  size = 36,
  shortenOnTight = false,
  className,
}: {
  size?: number;
  shortenOnTight?: boolean;
  className?: string;
}) {
  const [first, ...rest] = siteConfig.author.split(" ");

  return (
    <span className={cn("flex items-center gap-2.5 font-black tracking-tight", className)}>
      <Image
        src={icon}
        alt=""
        width={size}
        height={size}
        priority
        style={{ width: size, height: size }}
        className="rounded-xl transition-transform duration-300 group-hover:scale-110"
      />
      <span>
        {first}
        <span className={shortenOnTight ? "lg:hidden xl:inline" : undefined}> {rest.join(" ")}</span>
      </span>
    </span>
  );
}
