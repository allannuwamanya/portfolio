import { HeroSection } from "@/components/sections/hero";
import { GithubStatsSection } from "@/components/sections/github-stats";
import { ExploreSection } from "@/components/sections/explore";
import { getGithubSnapshot } from "@/lib/github";

/**
 * The landing page introduces the person (photo, name, what I do), shows live
 * GitHub numbers, then routes to the rest. Projects have their own page in the
 * nav, and everything the old About page said now lives in the hero.
 */
export default async function HomePage() {
  // Fetched at build time; null if GitHub was unreachable.
  const github = await getGithubSnapshot();

  return (
    <>
      <HeroSection />
      <GithubStatsSection snapshot={github} />
      <ExploreSection />
    </>
  );
}
