import type { Metadata } from "next";
import { BlogPreviewSection } from "@/components/sections/blog-preview";

export const metadata: Metadata = {
  title: "Writing & Articles",
  description: "Thoughts on software engineering, system design, and web development.",
};

export default function BlogPage() {
  return (
    <div className="pt-8">
      <BlogPreviewSection />
    </div>
  );
}
