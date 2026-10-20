import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

/** A deliberate "nothing here yet" panel, written for visitors rather than for the author. */
export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  action?: { label: string; href: string; external?: boolean };
}) {
  const actionClass =
    "mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline";

  return (
    <div className="gradient-border bento-card flex flex-col items-center gap-4 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
        <Icon className="h-5 w-5 text-accent" aria-hidden />
      </div>
      <h3 className="text-xl font-black text-foreground">{title}</h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{children}</p>
      {action &&
        (action.external ? (
          <a href={action.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
            {action.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <Link href={action.href} className={actionClass}>
            {action.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ))}
    </div>
  );
}
