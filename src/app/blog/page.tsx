import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing & Articles",
  description: "Thoughts on software engineering, system design, and web development.",
};

export default function BlogPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Writing</h1>
        <p className="text-muted-foreground">
          Technical deep-dives, architectural case studies, and learnings from production.
        </p>
      </div>
      <div className="mt-8 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Articles and MDX case studies will be displayed here.
      </div>
    </div>
  );
}
