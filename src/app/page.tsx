import { HeroSection } from "@/components/sections/hero";
import { ExploreSection } from "@/components/sections/explore";
import { FaqSection } from "@/components/sections/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { faqData } from "@/data/faq";
import { getGithubSnapshot } from "@/lib/github";
import { faqJsonLd } from "@/lib/seo";

/**
 * The first screen is the whole pitch: who I am (photo, name, what I do) and
 * proof of the work (live GitHub numbers). The rest of the site is one scroll
 * away in "Go deeper" and the nav.
 */
export default async function HomePage() {
  // Fetched at build time; null if GitHub was unreachable.
  const github = await getGithubSnapshot();

  return (
    <>
      <HeroSection snapshot={github} />
      <ExploreSection />
      <FaqSection />
      <JsonLd data={faqJsonLd(faqData)} />
    </>
  );
}
