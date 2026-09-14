import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { personalInfo } from "@/data/personal";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          🚀 Repository Initialized & Ready for Development
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          {personalInfo.name}
        </h1>

        <p className="text-lg text-muted-foreground sm:text-xl">
          {personalInfo.headline}
        </p>

        <p className="text-sm text-muted-foreground">
          {personalInfo.location} • {personalInfo.availability}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            GitHub Profile
          </Link>
          <Link
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
