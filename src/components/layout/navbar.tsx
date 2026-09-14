import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2 font-bold tracking-tight">
          <span className="text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
