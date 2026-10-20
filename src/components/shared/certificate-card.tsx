"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Award, BadgeCheck, Maximize2 } from "lucide-react";
import type { Certification } from "@/types";
import { assetUrl } from "@/lib/asset-url";
import { fadeUp } from "@/lib/animations";
import { cn, formatMonth } from "@/lib/utils";
import { Lightbox } from "@/components/shared/lightbox";
import { TechTag } from "@/components/shared/tech-tag";

/**
 * A certificate or award. The document sits in a frame that tilts toward the
 * pointer with a soft light following it; touch and reduced-motion visitors get
 * a static frame. Clicking opens the full-size scan in the lightbox.
 */
export function CertificateCard({ item, index }: { item: Certification; index: number }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState<number | null>(null);
  const [imageFailed, setImageFailed] = React.useState(false);

  // Pointer position inside the frame, 0..1.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 180, damping: 18 });
  const glow = useMotionTemplate`radial-gradient(380px circle at ${useTransform(px, (v) => v * 100)}% ${useTransform(py, (v) => v * 100)}%, hsl(var(--accent) / 0.2), transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const KindIcon = item.kind === "Award" ? Award : BadgeCheck;
  const isPhoto = item.imageFit === "photo";

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="gradient-border bento-card flex flex-col gap-4"
    >
      {!imageFailed && (
        <div style={{ perspective: 900 }} className="-mx-6 -mt-6 mb-1">
          <motion.button
            type="button"
            onClick={() => setOpen(0)}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            aria-label={`View ${item.title} full size`}
            style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-t-[1.25rem] border-b border-border/60 bg-[radial-gradient(circle_at_50%_0%,hsl(0_0%_14%),hsl(0_0%_5%))]"
          >
            <Image
              src={assetUrl(item.image.src)}
              alt={item.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              onError={() => setImageFailed(true)}
              className={cn(
                "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                isPhoto ? "object-cover object-[center_28%]" : "object-contain p-4 drop-shadow-2xl",
              )}
            />
            <motion.span
              aria-hidden
              style={reduceMotion ? undefined : { background: glow }}
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-bold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100"
            >
              <Maximize2 className="h-3 w-3" /> View full size
            </span>
          </motion.button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
            item.kind === "Award"
              ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
              : "border-accent/30 bg-accent/10 text-accent",
          )}
        >
          <KindIcon className="h-3 w-3" aria-hidden />
          {item.kind}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{formatMonth(item.date)}</span>
        {item.detail && (
          <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
            {item.detail}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-black leading-snug text-foreground">{item.title}</h3>
        <p className="mt-1 text-sm font-bold text-accent">{item.issuer}</p>
        {item.partners && item.partners.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">with {item.partners.join(" · ")}</p>
        )}
        {item.credential && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
            {item.credential}
          </p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <TechTag key={skill} name={skill} />
          ))}
        </div>
      )}

      {item.verifyUrl && (
        <a
          href={item.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-foreground transition-colors hover:text-accent"
        >
          Verify credential <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}

      <Lightbox
        images={[item.image]}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
        label={item.title}
      />
    </motion.article>
  );
}
