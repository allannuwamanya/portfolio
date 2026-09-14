import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t py-8 text-center text-sm text-muted-foreground">
      <div className="container max-w-5xl px-4">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, React 19, and Tailwind CSS.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </Link>
          <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </Link>
          <Link href={`mailto:${siteConfig.links.email}`} className="hover:underline">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
