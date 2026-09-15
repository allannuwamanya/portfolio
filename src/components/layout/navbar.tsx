"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  React.useEffect(() => { setIsOpen(false); }, [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "border-b border-border/40 bg-background/75 backdrop-blur-2xl shadow-[0_1px_0_hsl(var(--border)/0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 max-w-6xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 font-mono text-sm font-black tracking-tight">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-accent/40 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
              <span className="font-sans text-sm font-black">AN</span>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>{siteConfig.author.split(" ")[0]}<span className="text-accent">.</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-secondary"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link
              href={siteConfig.links.resume ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-4 text-xs font-bold text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_12px_hsl(161_84%_39%_/_0.3)]"
            >
              <Download className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
              Résumé
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-border/60 bg-background/90 backdrop-blur-2xl p-6 md:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <Link href="/" className="font-mono text-sm font-black" onClick={() => setIsOpen(false)}>
                  {siteConfig.author.split(" ")[0]}<span className="text-accent">.</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {mainNav.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                        pathname === item.href
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-border/40">
                <Link
                  href={siteConfig.links.resume ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 py-3 text-sm font-bold text-accent hover:bg-accent/20"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
