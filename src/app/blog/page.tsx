import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing & Articles",
  description: "Thoughts on software engineering, system design, and web development.",
};

export default function BlogPage() {
  return (
    <div className="container max-w-5xl py-28">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">04 / field notes</p>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Writing in public.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Technical deep-dives, architectural case studies, and learnings from production.
        </p>
      </div>
      <div className="mt-14 rounded-[1.25rem] border border-dashed border-border/90 bg-card/50 p-12 text-center text-muted-foreground">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Coming soon</p>
        <p className="mt-3">Articles and MDX case studies will be published here.</p>
      </div>
    </div>
  );
}
