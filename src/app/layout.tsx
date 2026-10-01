import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/constants";
import { PageTransition } from "@/components/providers/page-transition";
import NextTopLoader from "nextjs-toploader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// Google Sans ships under the SIL Open Font License (public/fonts/OFL.txt).
// Loaded via next/font/local because next/font/google's bundled font catalogue
// predates Google Sans and cannot resolve it.
const googleSans = localFont({
  src: "../../public/fonts/GoogleSans-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-google-sans",
  fallback: ["system-ui", "sans-serif"],
});

const googleSansCode = localFont({
  src: "../../public/fonts/GoogleSansCode-Variable-latin.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-google-sans-code",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // The generated opengraph-image.tsx resolves automatically relative to
    // metadataBase, so no explicit URL is needed here.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@allannuwamanya",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} ${googleSansCode.variable} min-h-screen`}>
        <NextTopLoader
          color="hsl(155, 62%, 45%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px hsl(155, 62%, 45%), 0 0 5px hsl(155, 62%, 45%)"
        />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
