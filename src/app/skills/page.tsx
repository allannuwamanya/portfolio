import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SkillsSection } from "@/components/sections/skills";

export const metadata: Metadata = pageMetadata({
  title: "Skills & Technologies",
  description:
    "The languages and tools Allan Nuwamanya works with: TypeScript, Python, Node.js, PostgreSQL, Temporal workflows, Next.js and PyTorch, grouped by area.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="pt-8">
      <SkillsSection />
    </div>
  );
}
