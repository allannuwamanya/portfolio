import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogPreviewSection } from "@/components/sections/blog-preview";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Articles by Allan Nuwamanya on software engineering. The first posts are on the way.",
  path: "/blog",
  noindex: true,
});

export default function BlogPage() {
  return (
    <div className="pt-8">
      <BlogPreviewSection />
    </div>
  );
}
