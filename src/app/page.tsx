import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { ExploreSection } from "@/components/sections/explore";

/**
 * The landing page routes people to a section rather than stacking every section
 * on one long scroll. About, Experience, Skills, Writing and Contact each own a
 * page; this page only offers the hero, featured work, and a way in.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExploreSection />
    </>
  );
}