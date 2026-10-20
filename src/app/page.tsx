import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { GithubStatsSection } from "@/components/sections/github-stats";
import { ExploreSection } from "@/components/sections/explore";
import { getGithubSnapshot } from "@/lib/github";

/**
 * The landing page introduces the person (photo, name, what I do), shows the
 * featured work and live GitHub numbers, then routes to the rest. Everything
 * the old About page said now lives in the hero.
 */
export default async function HomePage() {
  // Fetched at build time; null if GitHub was unreachable.
  const github = await getGithubSnapshot();

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <GithubStatsSection snapshot={github} />
      <ExploreSection />
    </>
  );
}
