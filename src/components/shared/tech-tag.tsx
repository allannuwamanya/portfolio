import { TechIcon, techBrandHex } from "@/components/shared/tech-icon";
import { cn } from "@/lib/utils";

/**
 * A project tag. Draws the real brand mark when one exists, and stays plain text
 * when the tag describes a domain ("CLI Tools") rather than a technology.
 */
export function TechTag({
  name,
  className,
  uppercase,
}: {
  name: string;
  className?: string;
  uppercase?: boolean;
}) {
  const hasBrand = techBrandHex(name) !== null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-secondary/50 px-2 py-1 text-[10px] font-bold text-muted-foreground transition-colors hover:text-foreground",
        uppercase && "uppercase tracking-wider",
        className,
      )}
    >
      {hasBrand && <TechIcon name={name} className="h-3 w-3 shrink-0" />}
      {name}
    </span>
  );
}