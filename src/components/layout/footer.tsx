import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/shared/brand-icons";
import { siteConfig, mainNav } from "@/lib/constants";
import { Logo } from "@/components/layout/logo";

const socialLinks = [
  { href: siteConfig.links.github, icon: GithubIcon, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: siteConfig.links.twitter ?? "#", icon: XIcon, label: "X" },
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
            <Link href="/" aria-label={siteConfig.author} className="group w-fit">
              <Logo size={32} className="text-sm" />
            </Link>
            <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
              Software engineer and Langratia co-founder in Uganda, building web applications, backend systems and AI tools.
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
                rel="noopener noreferrer me"
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
        </div>
      </div>
    </footer>
  );
}
