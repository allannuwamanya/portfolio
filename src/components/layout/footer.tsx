import Link from "next/link";
import { Code2, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, mainNav } from "@/lib/constants";

const socialLinks = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-6xl py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
                <Code2 className="h-4 w-4" />
              </span>
              <span>
                {siteConfig.author.split(" ")[0]}
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
              Full-stack engineer crafting high-performance web applications with modern technologies.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Navigation</p>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Connect</p>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© {year} {siteConfig.author}. All rights reserved.</p>
          <p className="font-mono">
            Built with{" "}
            <span className="text-accent">Next.js 15</span>
            {" & "}
            <span className="text-accent">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
