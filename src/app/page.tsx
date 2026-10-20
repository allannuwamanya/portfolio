import { HeroSection } from "@/components/sections/hero";
import { ExploreSection } from "@/components/sections/explore";
import { getGithubSnapshot } from "@/lib/github";

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
    </>
  );
}
