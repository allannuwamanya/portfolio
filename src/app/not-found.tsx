import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container flex min-h-[70svh] max-w-3xl flex-col items-start justify-center gap-6 py-28">
      <p className="font-mono text-sm uppercase tracking-wider text-accent">404</p>
      <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
        This page <span className="gradient-text">doesn&apos;t exist</span>
      </h1>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        The link may be out of date, or the page may have moved. The projects and contact pages are
        good places to pick back up.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:bg-accent/90"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-11 items-center rounded-xl border border-border bg-card/60 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5"
        >
          View projects
        </Link>
      </div>
    </section>
  );
}
